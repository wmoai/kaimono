import Component from '../components/App';
import { connect } from 'react-redux';
import { State } from '../store';
import { auth } from '../services/firebase';
import { login } from '../actions/app';

export default connect(
  (state: State) => ({
    isLoading: !state.app.isInitialized
  }),
  dispatch => ({
    initializeApp: () => {
      auth.signInAnonymously();
      auth.onAuthStateChanged(user => {
        dispatch(login(user ? user.uid : null));
      });
    }
  })
)(Component);
