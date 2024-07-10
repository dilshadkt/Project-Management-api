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
