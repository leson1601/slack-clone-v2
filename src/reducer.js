export const initialState = {
  user: null,
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
export default reducer;
