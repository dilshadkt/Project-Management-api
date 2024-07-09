import express from 'express';
import { keys } from '../config/keys';
import apiRoutes from './api/index';
const router = express.Router();
const { apiUrl } = keys.app;
const api = `/${apiUrl}`;

//api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

export default router;
