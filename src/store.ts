import { createStore, combineReducers, applyMiddleware } from 'redux';
import shoppingList, {
  State as ShoppingListState
} from './reducers/shoppingList';

import middleware from './middleware';
export interface State {
  shoppingList: ShoppingListState;
}

const reducer = combineReducers({ shoppingList });
const store = createStore(reducer, applyMiddleware(middleware));

export default store;
