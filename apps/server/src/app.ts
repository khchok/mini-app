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

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', index);
app.use('/api/items', itemRoutes);

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
        url: 'http://localhost:3334',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.ts')], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorNotFoundHandler);
app.use(errorHandler);
