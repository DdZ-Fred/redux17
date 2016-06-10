import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';


/** ************
 *   REDUCERS  *
 ** ***********/

// Todo reducer
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    }
    case 'TOGGLE_TODO': {
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed,
      });
    }
    default: {
      return state;
    }

  }
};
// Todos reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        todo(undefined, action),
      ];
    }
    case 'TOGGLE_TODO': {
      return state.map(t => todo(t, action));
    }
    default: {
      return state;
    }
  }
};
// visibilityFilter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});


/** ****************
 * TODOAPP COMPONENT
 * *****************/

function TodoApp() {
  return (
    <div>
      {/* ref string will likely be deprecated, ref callbacks prefered!*/}
      <AddTodo/>
      <VisibleTodoList />
      <Footer />
    </div>
  );
}


/** **********
 * RENDERING *
 ************/

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
