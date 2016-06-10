import React, { PropTypes } from 'react';
import Todo from './Todo';

const propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

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
TodoList.propTypes = propTypes;

export default TodoList;
