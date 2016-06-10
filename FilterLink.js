import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from './Link';
import { setVisibilityFilter } from './actionCreators';

const propTypes = {
  filter: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

FilterLink.propTypes = propTypes;

export default FilterLink;
