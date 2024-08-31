import express from 'express';
import { projectController } from '../controllers/Project.controller.js';

const projectRouter = express.Router();

// routes
projectRouter.post('/', projectController);

export default projectRouter;