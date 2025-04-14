import { Request, Response } from 'express';
import Task from '../models/Task';
import { publishTaskUpdate } from '../utils/pubsub';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, completed: false, userId: req.userId });
  await task.save();
  await publishTaskUpdate({ action: 'create', task });
  res.status(201).json(task);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!updatedTask) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
  await publishTaskUpdate({ action: 'update', task: updatedTask });
  res.json(updatedTask);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.userId });
  if (!deletedTask) {
    return res.status(404).json({ message: 'Tarefa não encontrada' });
  }
  await publishTaskUpdate({ action: 'delete', task: deletedTask });
  res.json({ message: 'Tarefa deletada com sucesso' });
};
