import express from 'express';
import authRoutes from './auth';
import stickRoutes from './stickwall';
import profileRoutes from './profile';
import todoRoutes from './todo';
const router = express.Router();

//AUTH ROUTE
router.use('/auth', authRoutes);
router.use('/stick', stickRoutes);
router.use('/profile', profileRoutes);
router.use('/todo', todoRoutes);
router.use('/wake-up', () => console.log('object'));

export default router;
