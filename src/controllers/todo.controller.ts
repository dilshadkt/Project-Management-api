// todo controller
import { Response } from 'express';
import { CustomRequest } from '../middleware/verifyToken';
import { Todo } from '../models/todo';

const addTodo = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'You must enter a title.' });
    }
    if (!description) {
      return res.status(400).json({ error: 'You must enter a description.' });
    }
    const newTodo = new Todo({
      title,
      description,
      user_id: userId,
    });
    await newTodo.save();
    const todos = await Todo.find({ user_id: req.userId });
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for create todo could not be processed. Please try again.',
    });
  }
};

const deleteTodo = async (req: CustomRequest, res: Response) => {
  try {
    const listId = req.params.listId;
    const todoList = await Todo.findById(listId);
    if (!todoList) {
      return res.status(400).json({ error: 'There is no list with this id' });
    }
    await Todo.findByIdAndDelete(listId);
    res.status(200).json({
      success: true,
      message: 'The selected list is removed',
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for delete tod could not be processed. Please try again.',
    });
  }
};

const getTodos = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const todos = await Todo.find({ user_id: userId });
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for getting todos could not be processed. Please try again.',
    });
  }
};
const updateTodo = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;
    const listId = req.params.listId;
    const list = await Todo.findById(listId);
    const changes = req.body;
    if (!list) {
      return res.status(400).json({ error: 'Thers is no list with this id' });
    }
    const updated = await Todo.findByIdAndUpdate(
      listId,
      { ...changes },
      { new: true },
    );
    const todos = await Todo.find({ user_id: userId });
    res.status(200).json({
      success: true,
      message: 'List updated',
      todo: todos,
    });
  } catch (error) {
    res.status(400).json({
      error:
        'Your request for getting todos could not be processed. Please try again.',
    });
  }
};

export { addTodo, deleteTodo, getTodos, updateTodo };
