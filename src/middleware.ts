import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { State } from './store';
import {
  CREATE,
  ADD_ITEM,
  PURCHASE,
  DELETE_ITEM,
  create,
  addItem,
  purchase,
  deleteItem
} from './actions/shoppingList';
import { CONFIRM, confirm } from './actions/modal';
import * as ShoppingList from './entities/ShoppingList';

import history from './history';

type Actions =
  | ReturnType<typeof create>
  | ReturnType<typeof addItem>
  | ReturnType<typeof purchase>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof confirm>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch
) => async (action: Actions) => {
  switch (action.type) {
    case CREATE: {
      const id = await ShoppingList.create();
      history.push(`/shoppinglists/${id}`);
      return;
    }
    case ADD_ITEM: {
      const { name } = action.payload;
      const state = store.getState();
      ShoppingList.addItem(name, state.shoppingList.id);
      return;
    }
    case PURCHASE: {
      const state = store.getState();
      const { checkedItems, id } = state.shoppingList;
      ShoppingList.purchase(checkedItems, id);
      break;
    }
    case DELETE_ITEM: {
      const { item } = action.payload;
      const state = store.getState();
      ShoppingList.delteItem(item, state.shoppingList.id);
      break;
    }
    case CONFIRM: {
      const state = store.getState();
      const { onConfirm } = state.modal;
      onConfirm && onConfirm();
      break;
    }
  }
  return next(action);
};

export default middleware;
