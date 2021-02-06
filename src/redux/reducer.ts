export const initialState: any = {
  authenticated: localStorage.getItem('authenticated') === 'true' ? true : false,
  token: localStorage.getItem('token'),
  other: true,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'AUTHTRUE':
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
      };
    case 'AUTHFALSE':
      return {
        ...state,
        authenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
