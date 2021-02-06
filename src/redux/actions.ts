import { queryClient } from 'Utils/util';

export const loginSuccess = ({ token }: any) => {
  localStorage.setItem('token', token);
  localStorage.setItem('authenticated', 'true');
  return {
    type: 'AUTHTRUE',
    payload: {
      token,
    },
  };
};

export const loginFail = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('authenticated');
  queryClient.clear();
  return { type: 'AUTHFALSE' };
};

export const logout = () => {
  return loginFail();
};
