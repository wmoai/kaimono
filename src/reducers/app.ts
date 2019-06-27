import {
  LOGIN,
  login,
  LOAD_BROWSE_HISTORY,
  loadBrowseHistory
} from '../actions/app';

import BrowseHistory, * as browseHistory from '../entities/BrowseHistory';

export interface State {
  isInitialized: boolean;
  userId?: string;
  browseHistory: BrowseHistory[];
}

const initialState: State = {
  isInitialized: false,
  userId: null,
  browseHistory: []
};

type Actions = ReturnType<typeof login> | ReturnType<typeof loadBrowseHistory>;

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case LOGIN: {
      const { userId } = action.payload;
      const isInitialized = state.isInitialized || userId !== null;
      return {
        ...state,
        isInitialized,
        userId
      };
    }
    case LOAD_BROWSE_HISTORY: {
      return {
        ...state,
        browseHistory: browseHistory.get()
      };
    }
  }
  return state;
}
