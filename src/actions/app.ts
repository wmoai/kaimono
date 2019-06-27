export const LOGIN = 'APP/LOGIN';
export const login = (userId?: string) => ({
  type: LOGIN as typeof LOGIN,
  payload: { userId }
});

export const LOAD_BROWSE_HISTORY = 'APP/LOAD_BROWSE_HISTORY';
export const loadBrowseHistory = () => ({
  type: LOAD_BROWSE_HISTORY as typeof LOAD_BROWSE_HISTORY
});
