const {
  getTodoById,
  getTodoList,
  deleteTodoById,
  addTodoById,
  updateTodoById,
} = require('../controller/todo');

module.exports = () => {
  app.get('/todo/:id', getTodoById);

  app.get('/todo', getTodoList);

  app.delete('/todo/:id', deleteTodoById);

  app.post('/todo', addTodoById);

  app.post('/todo/:id', updateTodoById);
};
