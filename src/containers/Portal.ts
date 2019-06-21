import Component from '../components/Portal';
import { connect } from 'react-redux';

import { create } from '../actions/shoppingList';

export default connect(
  state => ({}),
  dispatch => {
    return {
      onCreateShoppingList: () => {
        dispatch(create());
      }
    };
  }
)(Component);
