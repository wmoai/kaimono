export const LOGIN = 'APP/LOGIN';
export const login = (userId?: string) => ({
  type: LOGIN as typeof LOGIN,
  payload: { userId }
});
