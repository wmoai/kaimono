import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './containers/App';
import * as ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
