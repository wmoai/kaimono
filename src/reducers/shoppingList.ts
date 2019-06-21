import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';
import { Identifier } from '../entities/Entity';
import {
  INIT,
  init,
  SYNC,
  sync,
  TOGGLE_ITEM_CHECK,
  toggleItemCheck,
  PURCHASE,
  purchase
} from '../actions/shoppingList';

export interface State {
  id: Identifier<ShoppingList>;
  items: Item[];
  checkedItems: Identifier<Item>[];
}

const initialState: State = {
  id: null,
  items: [],
  checkedItems: []
};

type Actions =
  | ReturnType<typeof sync>
  | ReturnType<typeof init>
  | ReturnType<typeof toggleItemCheck>
  | ReturnType<typeof purchase>;

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case INIT: {
      const { id } = action.payload;
      return {
        id,
        items: [],
        checkedItems: []
      };
    }
    case SYNC: {
      const { items } = action.payload;
      return {
        ...state,
        items
      };
    }
    case TOGGLE_ITEM_CHECK: {
      const { item } = action.payload;
      const checkedItems = state.checkedItems.find(id => id.equal(item.id))
        ? state.checkedItems.filter(id => !id.equal(item.id))
        : state.checkedItems.concat(item.id);
      return {
        ...state,
        checkedItems
      };
    }
    case PURCHASE: {
      return {
        ...state,
        checkedItems: []
      };
    }
    default:
      return state;
  }
}
