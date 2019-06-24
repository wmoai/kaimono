import { createStore, combineReducers, applyMiddleware } from 'redux';
import shoppingList, {
  State as ShoppingListState
} from './reducers/shoppingList';
import modal, { State as ModalState } from './reducers/modal';

import middleware from './middleware';
export interface State {
  shoppingList: ShoppingListState;
  modal: ModalState;
}

const reducer = combineReducers({ shoppingList, modal });
const store = createStore(reducer, applyMiddleware(middleware));

export default store;
