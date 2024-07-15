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
