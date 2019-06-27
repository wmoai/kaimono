import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';
import { Identifier } from '../entities/Entity';
import {
  INIT,
  init,
  SYNC_INFO,
  syncInfo,
  SYNC_ITEMS,
  syncItems,
  TOGGLE_ITEM_CHECK,
  toggleItemCheck,
  PURCHASE,
  purchase,
  DELETE_ITEM,
  deleteItem
} from '../actions/shoppingList';

export interface State {
  id: Identifier<ShoppingList>;
  title: string;
  items: Item[];
  checkedItems: Identifier<Item>[];
}

const initialState: State = {
  id: null,
  title: '',
  items: [],
  checkedItems: []
};

type Actions =
  | ReturnType<typeof syncInfo>
  | ReturnType<typeof syncItems>
  | ReturnType<typeof init>
  | ReturnType<typeof toggleItemCheck>
  | ReturnType<typeof purchase>
  | ReturnType<typeof deleteItem>;

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case INIT: {
      const { id } = action.payload;
      return {
        ...initialState,
        id
      };
    }
    case SYNC_INFO: {
      const { title } = action.payload;
      return {
        ...state,
        title
      };
    }
    case SYNC_ITEMS: {
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
    case DELETE_ITEM: {
      const { item } = action.payload;
      const checkedItems = state.checkedItems.filter(id => !id.equal(item.id));
      return {
        ...state,
        checkedItems
      };
    }
    default:
      return state;
  }
}
