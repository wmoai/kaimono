import Item from '../entities/Item';
import { Identifier } from '../entities/Entity';
import {
  INIT_LIST,
  initList,
  SYNC_LIST,
  syncList,
  TOGGLE_ITEM_CHECK,
  toggleItemCheck
} from '../actions/list';

export interface State {
  items: Item[];
  checkedItems: Identifier<Item>[];
}

const initialState: State = {
  items: [],
  checkedItems: []
};

type Actions =
  | ReturnType<typeof syncList>
  | ReturnType<typeof initList>
  | ReturnType<typeof toggleItemCheck>;

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case INIT_LIST: {
      return {
        items: [],
        checkedItems: []
      };
    }
    case SYNC_LIST: {
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
    default:
      return state;
  }
}
