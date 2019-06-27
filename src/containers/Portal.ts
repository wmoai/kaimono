import Component from '../components/Portal';
import { connect } from 'react-redux';

import { State } from '../store';
import { create } from '../actions/shoppingList';
import { loadBrowseHistory } from '../actions/app';

export default connect(
  (state: State) => ({
    browseHistory: state.app.browseHistory
  }),
  dispatch => {
    return {
      loadBrowseHistory: () => {
        dispatch(loadBrowseHistory());
      },
      onCreateShoppingList: () => {
        dispatch(create());
      }
    };
  }
)(Component);
