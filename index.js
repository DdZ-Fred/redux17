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


// ####################
// FilterLink Component
// ######       #######
function FilterLink({ filter, currentFilter, children }) {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter,
        });
      }}
    >
      {children}
    </a>
  );
}
// #######       #######
// #####################


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
    const {
      todos,
      visibilityFilter,
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
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
          {visibleTodos.map((t) => (
            <li
              key={t.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: t.id,
                });
              }}
              style={{
                textDecoration:
                  t.completed ?
                    'line-through' :
                    'none',
              }}>
              {t.text}
            </li>
          ))}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            filter="SHOW_ALL"
            currentFilter={visibilityFilter}>All</FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_ACTIVE"
            currentFilter={visibilityFilter}>Active</FilterLink>
          {' '}
          <FilterLink
            filter="SHOW_COMPLETED"
            currentFilter={visibilityFilter}>Completed</FilterLink>
        </p>
      </div>
    );
  }
}

TodoApp.propTypes = propTypes;
// #######      ########
// #####################

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()} />,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();
