import { Router } from 'express';
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: The item name
 *         description:
 *           type: string
 *           description: The item description
 *       example:
 *         id: d5fE_asz
 *         name: Sample Item
 *         description: This is a sample item
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/', getItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 */
router.get('/:id', getItemById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */
router.post('/', createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *    summary: Update the item by the id
 *    tags: [Items]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 *    responses:
 *      200:
 *        description: The item was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      404:
 *        description: The item was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id', updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/:id', deleteItem);

export default router;
