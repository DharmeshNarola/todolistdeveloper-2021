import axios from 'axios';
import { env } from './constant';

const baseUrl = env.BASE_URL;

export const getTodos = async () => {
  try {
    const todo = await axios.get(baseUrl + 'todo');
    return todo && todo.data ? todo.data : [];
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (newTodoName) => {
  try {
    const todo = {
      todo: newTodoName,
    };
    const saveTodo = await axios.post(baseUrl + 'todo', todo);
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (todo) => {
  try {
    const updateTodo = await axios.post(baseUrl + 'todo/' + todo.id, todo);
    return updateTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const message = await axios.delete(baseUrl + 'todo/' + id);
    return message;
  } catch (error) {
    throw new Error(error);
  }
};
