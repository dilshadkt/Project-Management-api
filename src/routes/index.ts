import express from 'express';
import { keys } from '../config/keys';
import apiRoutes from './api/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig';

const router = express.Router();
const { apiUrl } = keys.app;
const api = `/${apiUrl}`;

//api routes
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

export default router;
