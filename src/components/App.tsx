import * as React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../history';
import Portal from '../containers/Portal';
import ShoppingList from '../containers/ShoppingList';
import Modal from '../containers/Modal';

interface Props {
  isLoading: boolean;
  initializeApp: () => void;
}

export default function App(props: Props) {
  const { isLoading, initializeApp } = props;
  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <Router history={history}>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <Route exact path="/" component={Portal} />
          <Route exact path="/shoppinglists/:id" component={ShoppingList} />
        </div>
      )}
      <Modal />
    </Router>
  );
}
