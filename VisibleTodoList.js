import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';

function getVisibleTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL': {
      return todos;
    }
    case 'SHOW_ACTIVE': {
      return todos.filter(t => !t.completed);
    }
    case 'SHOW_COMPLETED': {
      return todos.filter(t => t.completed);
    }
    default: {
      return todos;
    }
  }
}

function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id,
      });
    },
  };
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
