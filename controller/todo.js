const { v4: uuidv4 } = require('uuid');
const _ = require('underscore');
let data = [];

const getTodoById = (req, res) => {
  try {
    //get todo by id
    console.log('Todo With Id ' + req.params.id + ' Is Requested');
    res.send(data[req.params.id]);
  } catch (error) {
    throw error;
  }
};

const getTodoList = (req, res) => {
  //get all todo
  console.log('All Todos Requested');
  res.send(_.sortBy(data, 'status'));
};

const deleteTodoById = (req, res) => {
  try {
    //delete todo by id
    console.log('todo With Id ' + req.params.id + ' Is Deleted');
    if (req.params.id) {
      data = data.filter((todo) => todo.id != req.params.id);
    }
    res.send('Todo Is Deleted');
  } catch (error) {
    throw error;
  }
};

const addTodoById = (req, res) => {
  try {
    //add new todo
    if (req.body && req.body.todo) {
      data.push({
        id: uuidv4(),
        name: req.body.todo,
        status: 'ACTIVE',
        created_on: new Date().getTime(),
      });
    }
    res.send('New Todo Added');
  } catch (error) {
    throw error;
  }
};

const updateTodoById = (req, res) => {
  try {
    //update particular todo
    if (req.params.id && req.body) {
      data.forEach((todo) => {
        if (todo.id === req.params.id) {
          todo.name = req.body.name;
          todo.status = req.body.status;
          todo.modified_on = new Date().getTime();
        }
      });
    }
    res.send('Todo Updated');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTodoById,
  getTodoList,
  updateTodoById,
  deleteTodoById,
  addTodoById,
};
