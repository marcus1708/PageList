// src/routes/taskRoutes.ts
import authMiddleware from '../middlewares/authMiddleware';

import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';

const router = express.Router();

router.use(authMiddleware); // Protege todas as rotas abaixo

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default authMiddleware;