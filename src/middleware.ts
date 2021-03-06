import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { State } from './store';
import {
  CREATE,
  create,
  UPDATE_TITLE,
  updateTitle,
  ADD_ITEM,
  addItem,
  PURCHASE,
  purchase,
  DELETE_ITEM,
  deleteItem,
  DELETE_ALL_PURCHAED_ITEMS,
  deleteAllPurchasedItems,
  syncInfo,
  SYNC_INFO
} from './actions/shoppingList';
import { CONFIRM, confirm } from './actions/modal';
import * as ShoppingList from './entities/ShoppingList';

import { shoppingListPath } from './components/App';
import history from './history';
import * as browseHistory from './entities/BrowseHistory';

type Actions =
  | ReturnType<typeof create>
  | ReturnType<typeof updateTitle>
  | ReturnType<typeof addItem>
  | ReturnType<typeof purchase>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof deleteAllPurchasedItems>
  | ReturnType<typeof syncInfo>
  | ReturnType<typeof confirm>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch
) => async (action: Actions) => {
  switch (action.type) {
    case CREATE: {
      const id = await ShoppingList.create();
      history.push(shoppingListPath(id));
      return;
    }
    case UPDATE_TITLE: {
      const { title } = action.payload;
      const state = store.getState();
      ShoppingList.updateTitle(title, state.shoppingList.id);
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
    case DELETE_ALL_PURCHAED_ITEMS: {
      const state = store.getState();
      ShoppingList.deleteAllPurchasedItems(state.shoppingList.id);
      return;
    }
    case SYNC_INFO: {
      const { title } = action.payload;
      const state = store.getState();
      browseHistory.set(state.shoppingList.id, title);
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
