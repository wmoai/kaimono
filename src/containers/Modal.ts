import Component from '../components/Modal';
import { connect } from 'react-redux';
import { State } from '../store';

import { cancel, confirm } from '../actions/modal';

export default connect(
  (state: State) => ({
    isOpen: state.modal.isOpen,
    contents: state.modal.contents
  }),
  dispatch => {
    return {
      onCancel: () => {
        dispatch(cancel());
      },
      onConfirm: () => {
        dispatch(confirm());
      }
    };
  }
)(Component);
