import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';

// Routes
import { index } from './routes/index';
import itemRoutes from './routes/itemRoutes';

// Create Express server
export const app = express();
app.use(express.json());

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );
// app.use(bodyParser.json());

// Express configuration
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

// Add CORS for deployment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Debug logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '../public')));

// Routes setup
app.use('/', index);
app.use('/api/items', itemRoutes);

// Catch-all for debugging
app.use('*', (req, res, next) => {
  console.log(`Unmatched route: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(errorNotFoundHandler);
app.use(errorHandler);
