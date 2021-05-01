import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  ListItemText,
  Divider,
} from '@material-ui/core';
import FlipMove from 'react-flip-move';

export default function TodoListItems(props) {
  const useStyles = makeStyles((theme) => ({
    list: {
      overflow: "auto",
      [theme.breakpoints.up(780)]: {
        maxHeight: 180,
      },
      [theme.breakpoints.down(780)]: {
        maxHeight: 180,
      },
    },
    lineThough: {
      textDecoration: "line-through",
    },
  }));

  const classes = useStyles();

  const handleToggle = (value) => () => {
    value.status = value.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    props.updateTodo(value);
  };

  return (
    <FlipMove duration={1000} easing='ease-in-out'>
      <List className={classes.list}>
        {props.todoList && Array.isArray(props.todoList)
          ? props.todoList.filter((todo) => todo.status === props.status).map((value) => (
              <React.Fragment key={value.id}>
                <ListItem
                  key={value.id}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      color='primary'
                      checked={value.status === 'INACTIVE'}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`${value.id}-text`}
                    primary={value.name}
                    className={
                      value.status === 'INACTIVE' ? classes.lineThough : ''
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      color='primary'
                      onClick={(e) => props.removeTodo(e, value.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider key={`${value.id}-divider`} />
              </React.Fragment>
            ))
          : 'No Todo Found'}
      </List>
    </FlipMove>
  );
}
