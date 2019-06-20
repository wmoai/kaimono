import Item from '../entities/Item';
import { Identifier } from '../entities/entity';
import { INIT_LIST, initList, SYNC_LIST, syncList } from '../actions/list';

export interface State {
  items: Item[];
  checkedItems: Identifier<Item>[];
}

const initialState: State = {
  items: [],
  checkedItems: []
};

type Actions = ReturnType<typeof syncList> | ReturnType<typeof initList>;

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
    default:
      return state;
  }
}
