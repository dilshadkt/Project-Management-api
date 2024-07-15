/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API endpoints for managing user profile data
 */

import express from 'express';
import { verifyToken } from '../../middleware/verifyToken';
import {
  getUserData,
  updateUserData,
} from '../../controllers/profile.controller';
const router = express.Router();

router.get('/', verifyToken, getUserData);
router.patch('/', verifyToken, updateUserData);

export default router;

//   GET USER DATA
/**
 * @swagger
 * /api/profile/:
 *   get:
 *     summary: Get user profile data
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found or request could not be processed
 */

//     UPDATE USER DATA
/**
 * @swagger
 * /api/profile/:
 *   patch:
 *     summary: Update user profile data
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found or request could not be processed
 */
