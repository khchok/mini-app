import { Router } from 'express';
import * as controller from '../controllers/index';

export const index = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome page
 *     description: Returns the main welcome page
 *     responses:
 *       200:
 *         description: Welcome page rendered successfully
 */
index.get('/', controller.index);
