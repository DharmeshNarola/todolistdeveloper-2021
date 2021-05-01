import './App.css';
import React, { useState, useEffect } from 'react';
import TodoListItems from './Component/TodoListItems';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  CardContent,
  Card,
  OutlinedInput,
  CardHeader,
  Button,
  FormControl,
  Snackbar,
} from '@material-ui/core';
import clsx from 'clsx';
import { getTodos, addTodo, deleteTodo, updateTodo } from './Api';

function App() {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos()
      .then((todos) => {
        setTodoList(todos);
      })
      .catch((err) => console.log(err));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: '100%',
      width: '100%',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    card: {
      // width: 500,
      // height: 500,
      [theme.breakpoints.up(780)]: {
        width: 600,
        height: '100%',
      },
      [theme.breakpoints.down(780)]: {
        width: '100%',
        height: '100%',
      },
      border: '0!important',
      boxShadow: '0 0 2rem 0 rgba(136, 152, 170,.15)!important',
      textAlign: 'center',
    },
    cardHeader: {
      [theme.breakpoints.up(780)]: {
        width: 600,
      },
      [theme.breakpoints.down(780)]: {
        width: '100%',
        height: '100%',
      },
      textAlign: 'center',
    },
    todoForm: {
      // width: '100%',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textInput: {
      // width: '100%',
    },
    cardContent: {
      paddingTop: 0,
      paddingBottom: '12px !important',
    },
    list: {
      paddingBottom: '12px !important',
    },
    bgcolor: {  
      backgroundColor:'azure'
    },
  }));

  const classes = useStyles();

  const addNewTodo = (e) => {
    e.preventDefault();
    addTodo(input)
      .then((data) => {
        fetchTodos();
        setMessage('New Todo Added');
        setOpen(true);
        setInput('');
      })
      .catch((err) => console.log(err));
  };

  const removeTodo = (e, id) => {
    e.preventDefault();
    deleteTodo(id)
      .then((data) => {
        fetchTodos();
        setMessage('Todo Removed');
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const modifyTodo = (todo) => {
    updateTodo(todo)
      .then((data) => {
        fetchTodos();
        setMessage('Todo Updated');
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.root}
    >
      {message ? (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={handleClose}
          autoHideDuration={1000}
          message={message}
          key='snack-bar'
        />
      ) : null}
      <Card className={classes.cardHeader}>
        <CardHeader title='Todo List App' className={classes.bgcolor} />
        <form
          id='todo-input-form'
          className={classes.todoForm}
          noValidate
          autoComplete='off'
          onSubmit={addNewTodo}
        >
          <Grid container spacing={0} alignItems='center' justify='center'>
            <Grid item xl={8}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant='outlined'
              >
                <OutlinedInput
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Enter Note'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  labelWidth={0}
                  className={classes.textInput}
                />
              </FormControl>
            </Grid>
            <Grid item xl={2}>
              <FormControl>
                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
                  disabled={input.length === 0}
                >
                  Add
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Card className={classes.card}>
        <CardHeader title='Todo Task' className={classes.bgcolor}/>
        <CardContent className={classes.cardContent}>
          <TodoListItems
            todoList={todoList}
            removeTodo={removeTodo}
            updateTodo={modifyTodo}
            status='ACTIVE'
            className={classes.list}
          ></TodoListItems>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader title='Completed Task' className={classes.bgcolor} />
        <CardContent className={classes.cardContent}>
          <TodoListItems
            todoList={todoList}
            removeTodo={removeTodo}
            updateTodo={modifyTodo}
            status='INACTIVE'
            className={classes.list}
          ></TodoListItems>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default App;