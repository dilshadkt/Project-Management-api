import express from 'express';
import authRoutes from './auth';
const router = express.Router();

//AUTH ROUTE
router.use('/auth', authRoutes);
router.use('/wake-up', () => console.log('object'));

export default router;
