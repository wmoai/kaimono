import { createStore, combineReducers, applyMiddleware } from 'redux';
import list, { State as ListState } from './reducers/list';

import middleware from './middleware';
export interface State {
  list: ListState;
}

const reducer = combineReducers({ list });
const store = createStore(reducer, applyMiddleware(middleware));

export default store;
