import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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

const store = createStore(todoApp);

// #################
// TODOAPP Component
// #################
const propTypes = {
  todos: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
    return (
      <div>
        {/* ref string will likely be deprecated, ref callbacks prefered!*/}
        <input ref={(node) => {
          this.nextTodoTxtInput = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: this.nextTodoTxtInput.value,
          });
          this.nextTodoTxtInput.value = '';
        }}>Add Todo</button>
        <ul>
          {this.props.todos.map((t) => (
            <li key={t.id}>
              {t.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

TodoApp.propTypes = propTypes;
// #####################
// #####################

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
      visibilityFilter={store.getState().visibilityFilter} />,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();
