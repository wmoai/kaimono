import { createStore, combineReducers, applyMiddleware } from 'redux';
import app, { State as AppState } from './reducers/app';
import shoppingList, {
  State as ShoppingListState
} from './reducers/shoppingList';
import modal, { State as ModalState } from './reducers/modal';

import middleware from './middleware';
export interface State {
  app: AppState;
  shoppingList: ShoppingListState;
  modal: ModalState;
}

const reducer = combineReducers({ app, shoppingList, modal });
const store = createStore(reducer, applyMiddleware(middleware));

export default store;
