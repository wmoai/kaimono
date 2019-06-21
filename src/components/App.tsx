import * as React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../history';
import Portal from '../containers/Portal';
import ShoppingList from '../containers/ShoppingList';

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Portal} />
        <Route exact path="/shoppinglists/:id" component={ShoppingList} />
      </div>
    </Router>
  );
}
