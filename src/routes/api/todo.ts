import express from 'express';
import { verifyToken } from '../../middleware/verifyToken';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../../controllers/todo.controller';
const Router = express.Router();

Router.post('/add-todo', verifyToken, addTodo);
Router.delete('/:listId', verifyToken, deleteTodo);
Router.patch('/:listId', verifyToken, updateTodo);
Router.get('/', verifyToken, getTodos);

export default Router;
