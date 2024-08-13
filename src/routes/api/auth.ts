import express from 'express';
import { userValidationSchema } from '../../validation/user.validate';
import { validate } from '../../middleware/validate';
import {
  accessToDashboard,
  loginUser,
  logoutUser,
  registerUser,
  GetOtp,
  VerifyOtp,
} from '../../controllers/auth.controller';
import { verifyToken } from '../../middleware/verifyToken';

const router = express.Router();

// RESTISTER NEW USER 🪁

router.post('/register', validate(userValidationSchema), registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/home', verifyToken, accessToDashboard);
router.post('/get-otp', GetOtp);
router.post('/verify-otp', VerifyOtp);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *       example:
 *         email: user@example.com
 *         password: password123
 *         firstName: John
 *         lastName: Doe
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */
//    REGISTER USER
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Your request could not be processed
 */
//    LOGIN USER
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Your request could not be processed
 */

// LOGOUT USER
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Your request could not be processed
 */

//     VERIFY TOKEN

/**
 * @swagger
 * /api/auth/home:
 *   post:
 *     summary: Access the dashboard
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Unauthorized
 */
