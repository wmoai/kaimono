import { ReactNode } from 'react';

export const OPEN = 'MODAL/OPEN';
export const open = (contents: ReactNode, onConfirm: () => void) => ({
  type: OPEN as typeof OPEN,
  payload: {
    contents,
    onConfirm
  }
});

export const CANCEL = 'MODAL/CANCEL';
export const cancel = () => ({
  type: CANCEL as typeof CANCEL
});

export const CONFIRM = 'MODEL/CONFIRM';
export const confirm = () => ({
  type: CONFIRM as typeof CONFIRM
});
