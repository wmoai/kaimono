import Component from '../components/Dashboard';
import { connect } from 'react-redux';

import { createList } from '../actions/list';

export default connect(
  state => ({}),
  dispatch => {
    return {
      onCreateList: () => {
        dispatch(createList());
      }
    };
  }
)(Component);
