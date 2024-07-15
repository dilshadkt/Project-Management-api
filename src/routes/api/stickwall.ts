import express from 'express';
import {
  createSticWall,
  deleteStick,
  getSticks,
  updateStick,
} from '../../controllers/stick.controller';
import { verifyToken } from '../../middleware/verifyToken';
const router = express.Router();

// ROUTES REALATED TO STICK WALL 🪁
router.post('/create', verifyToken, createSticWall);
router.get('/', verifyToken, getSticks);
router.patch('/:stickId', verifyToken, updateStick);
router.delete('/:stickId', verifyToken, deleteStick);

export default router;

/**
 * @swagger
 * tags:
 *   name: StickWall
 *   description: API endpoints for managing stick wall operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Stick:
 *       type: object
 *       required:
 *         - title
 *         - desc
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the stick
 *         desc:
 *           type: string
 *           description: Description of the stick
 *       example:
 *         title: Sticky Note 1
 *         desc: This is my first sticky note description
 */

//       CREATE STICK

/**
 * @swagger
 * /api/stick/create:
 *   post:
 *     summary: Create a new stick
 *     tags: [StickWall]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stick'
 *     responses:
 *       200:
 *         description: Stick created successfully
 *       400:
 *         description: Your request could not be processed
 */

//       GET ALL STICK

/**
 * @swagger
 * /api/stick/:
 *   get:
 *     summary: Get all sticks
 *     tags: [StickWall]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved sticks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 sticks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Stick'
 *       400:
 *         description: Your request could not be processed
 */

// UPDATE STICK

/**
 * @swagger
 * /api/stick/{stickId}:
 *   patch:
 *     summary: Update a stick by ID
 *     tags: [StickWall]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stickId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the stick to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stick updated successfully
 *       400:
 *         description: Your request could not be processed
 *       404:
 *         description: No stick found with the provided ID
 */

// DELETE STICK
/**
 * @swagger
 * /api/stick/{stickId}:
 *   delete:
 *     summary: Delete a stick by ID
 *     tags: [StickWall]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stickId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the stick to delete
 *     responses:
 *       200:
 *         description: Stick deleted successfully
 *       400:
 *         description: Your request could not be processed
 *       404:
 *         description: No stick found with the provided ID
 */
