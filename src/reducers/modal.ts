import { ReactNode } from 'react';
import { OPEN, open, CANCEL, cancel, CONFIRM, confirm } from '../actions/modal';

export interface State {
  isOpen: boolean;
  contents?: ReactNode;
  onConfirm?: () => void;
}

const initialState: State = {
  isOpen: false
};

type Actions =
  | ReturnType<typeof open>
  | ReturnType<typeof cancel>
  | ReturnType<typeof confirm>;

export default function(state = initialState, action: Actions) {
  switch (action.type) {
    case OPEN: {
      if (state.isOpen) {
        break;
      }
      const { contents, onConfirm } = action.payload;
      return {
        ...state,
        isOpen: true,
        contents,
        onConfirm
      };
    }
    case CANCEL: {
      return {
        ...state,
        isOpen: false,
        contents: null,
        onConfirm: null
      };
    }
    case CONFIRM: {
      return {
        ...state,
        isOpen: false,
        contents: null,
        onConfirm: null
      };
    }
  }
  return state;
}
