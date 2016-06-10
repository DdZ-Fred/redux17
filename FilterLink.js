import React, { PropTypes } from 'react';
import Link from './Link';

const propTypes = {
  filter: PropTypes.string.isRequired,
};

const contextTypes = {
  store: PropTypes.object,
};

class FilterLink extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
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
FilterLink.propTypes = propTypes;
FilterLink.contextTypes = contextTypes;

export default FilterLink;
