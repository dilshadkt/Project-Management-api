import express from 'express';
import { userValidationSchema } from '../../validation/user.validate';
import { validate } from '../../middleware/validate';
import { loginUser, registerUser } from '../../controllers/auth.controller';
const router = express.Router();

// RESTISTER NEW USER 🪁
router.post('/register', validate(userValidationSchema), registerUser);
router.post('/login', loginUser);
export default router;
