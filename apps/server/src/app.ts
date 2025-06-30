import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';

// Routes
import { index } from './routes/index';
import itemRoutes from './routes/itemRoutes';

// Create Express server
export const app = express();
app.use(express.json());

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Add CORS for Vercel deployment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

// For Vercel deployment, we need to handle the /api prefix
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';

if (isVercel) {
  // On Vercel, routes are already prefixed with /api by the routing
  app.use('/', itemRoutes);
} else {
  // Local development
  app.use('/', index);
  app.use('/api/items', itemRoutes);
}

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: isVercel ? `${process.env.MY_DOMAIN}/api` : 'http://localhost:3334',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.ts')], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorNotFoundHandler);
app.use(errorHandler);
