import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';

export const CREATE = 'SHOPPING_LIST/CREATE';
export const create = () => ({
  type: CREATE as typeof CREATE
});

export const INIT = 'SHOPPING_LIST/INIT';
export const init = (id: Identifier<ShoppingList>) => ({
  type: INIT as typeof INIT,
  payload: { id }
});

export const SYNC = 'SHOPPING_LIST/SYNC';
export const sync = (items: Item[]) => ({
  type: SYNC as typeof SYNC,
  payload: { items }
});

export const ADD_ITEM = 'SHOPPING_LIST/ADD_ITEM';
export const addItem = (name: string) => ({
  type: ADD_ITEM as typeof ADD_ITEM,
  payload: { name }
});

export const TOGGLE_ITEM_CHECK = 'SHOPPING_LIST/TOGGLE_ITEM_CHECK';
export const toggleItemCheck = (item: Item) => ({
  type: TOGGLE_ITEM_CHECK as typeof TOGGLE_ITEM_CHECK,
  payload: { item }
});

export const PURCHASE = 'SHOPPING_LIST/PURCHASE';
export const purchase = () => ({
  type: PURCHASE as typeof PURCHASE
});

export const DELETE_ITEM = 'SHOPPING_LIST/DELETE_ITEM';
export const deleteItem = (item: Item) => ({
  type: DELETE_ITEM as typeof DELETE_ITEM,
  payload: { item }
});
