import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import Item from '../entities/Item';

export const CREATE_LIST = 'CREATE_LIST';
export const createList = () => ({
  type: CREATE_LIST as typeof CREATE_LIST
});

export const INIT_LIST = 'INIT_LIST';
export const initList = (id: Identifier<List>) => ({
  type: INIT_LIST as typeof INIT_LIST,
  payload: { id }
});

export const SYNC_LIST = 'SYNC_LIST';
export const syncList = (items: Item[]) => ({
  type: SYNC_LIST as typeof SYNC_LIST,
  payload: { items }
});

export const ADD_ITEM = 'ADD_ITEM';
export const addItem = (name: string) => ({
  type: ADD_ITEM as typeof ADD_ITEM,
  payload: { name }
});

export const TOGGLE_ITEM_CHECK = 'TOGGLE_ITEM_CHECK';
export const toggleItemCheck = (item: Item) => ({
  type: TOGGLE_ITEM_CHECK as typeof TOGGLE_ITEM_CHECK,
  payload: { item }
});

export const PURCHASE = 'PURCHASE';
export const purchase = () => ({
  type: PURCHASE as typeof PURCHASE
});
