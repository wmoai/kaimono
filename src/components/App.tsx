import * as React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../history';
import Dashboard from '../containers/Dashboard';
import List from '../containers/List';

export default function App() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/lists/:id" component={List} />
      </div>
    </Router>
  );
}
