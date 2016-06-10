import React, { PropTypes } from 'react';

const propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

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
Todo.propTypes = propTypes;

export default Todo;
