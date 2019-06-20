import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { State } from './store';
import {
  CREATE_LIST,
  ADD_ITEM,
  createList as createListAction,
  addItem as addItemAction
} from './actions/list';
import { create as createList, addItem } from './entities/List';

import history from './history';

type Actions =
  | ReturnType<typeof createListAction>
  | ReturnType<typeof addItemAction>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch
) => async (action: Actions) => {
  switch (action.type) {
    case CREATE_LIST: {
      const id = await createList();
      history.push(`/lists/${id}`);
      return;
    }
    case ADD_ITEM: {
      const { name, listId } = action.payload;
      addItem(name, listId);
      return;
    }
  }
  return next(action);
};

export default middleware;
