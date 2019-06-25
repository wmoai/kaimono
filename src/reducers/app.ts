import { LOGIN, login } from '../actions/app';

export interface State {
  isInitialized: boolean;
  userId?: string;
}

const initialState: State = {
  isInitialized: false,
  userId: null
};

type Actions = ReturnType<typeof login>;

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
  }
  return state;
}
