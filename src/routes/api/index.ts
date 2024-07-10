import express from 'express';
import authRoutes from './auth';
import stickRoutes from './stickwall';
const router = express.Router();

//AUTH ROUTE
router.use('/auth', authRoutes);
router.use('/stick', stickRoutes);
router.use('/wake-up', () => console.log('object'));

export default router;
