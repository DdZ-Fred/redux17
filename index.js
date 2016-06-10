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

// ###############
//      UTILS
// ###############

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


// ###############
//    COMPONENTS
// ###############

// ----- Filter Component ----- //
function Link({ active, onClick, children }) {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}

// ----- FilterLink(Container) Component ----- //
class FilterLink extends React.Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  render() {
    const props = this.props;
    const state = store.getState();
    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onCLick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          });
        }}
      >
        {props.children}
      </Link>
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

// ------- Footer Component ------- //
function Footer() {
  return (
    <p>
      Show:
      {' '}
      <FilterLink
        filter="SHOW_ALL">All</FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_ACTIVE">Active</FilterLink>
      {' '}
      <FilterLink
        filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
  );
}

// ------- Todo Component ------- //
function Todo({ text, completed, onClick }) {
  return (
    <li
      onClick={onClick}
      style={{
        textDecoration:
          completed ?
            'line-through' :
            'none',
      }}>
      {text}
    </li>
  );
}

// ------- TodoList Component ------- //
function TodoList({ todos, onTodoClick }) {
  return (
    <ul>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      ))}
    </ul>
  );
}

// ------- AddTodo Component ------- //
function AddTodo({ onAddClick }) {
  let input;
  return (
    <div>
      <input ref={(node) => {
        input = node;
      }} />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = '';
      }}>Add Todo</button>
    </div>
  );
}

// --------------------------------- //
// ------- TodoApp Component ------- //

let nextTodoId = 0;
function TodoApp({ todos, visibilityFilter }) {
  return (
    <div>
      {/* ref string will likely be deprecated, ref callbacks prefered!*/}
      <AddTodo
        onAddClick={(text) => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text,
          });
        }}
      />
      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        onTodoClick={(id) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id,
          });
        }} />
      <Footer />
    </div>
  );
}


// ###############
//    RENDERING
// ###############

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()} />,
    document.getElementById('app')
  );
};


store.subscribe(render);
render();
