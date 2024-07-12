import express from 'express';
import { userValidationSchema } from '../../validation/user.validate';
import { validate } from '../../middleware/validate';
import {
  accessToDashboard,
  loginUser,
  registerUser,
} from '../../controllers/auth.controller';
import { verifyToken } from '../../middleware/verifyToken';
const router = express.Router();

// RESTISTER NEW USER 🪁
router.post('/register', validate(userValidationSchema), registerUser);
router.post('/login', loginUser);
router.post('/home', accessToDashboard);

export default router;
