import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { State } from './store';
import {
  CREATE_LIST,
  ADD_ITEM,
  PURCHASE,
  DELETE_ITEM,
  createList,
  addItem,
  purchase,
  deleteItem
} from './actions/list';
import * as List from './entities/List';

import history from './history';

type Actions =
  | ReturnType<typeof createList>
  | ReturnType<typeof addItem>
  | ReturnType<typeof purchase>
  | ReturnType<typeof deleteItem>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch
) => async (action: Actions) => {
  switch (action.type) {
    case CREATE_LIST: {
      const id = await List.create();
      history.push(`/shoppinglists/${id}`);
      return;
    }
    case ADD_ITEM: {
      const { name } = action.payload;
      const state = store.getState();
      List.addItem(name, state.list.id);
      return;
    }
    case PURCHASE: {
      const state = store.getState();
      const { checkedItems, id } = state.list;
      List.purchase(checkedItems, id);
      break;
    }
    case DELETE_ITEM: {
      const { item } = action.payload;
      const state = store.getState();
      List.delteItem(item, state.list.id);
      return;
    }
  }
  return next(action);
};

export default middleware;
