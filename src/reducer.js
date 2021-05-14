export const initialState = {
  activeChannel: null,
  channels: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHANNELS':
      return { ...state, channels: action.payload };
    case 'SET_ACTIVE_CHANNEL':
      return { ...state, activeChannel: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
export default reducer;
