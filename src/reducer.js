export const initialState = {
  activeChannel: null,
  channels: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHANNELS':
      return { ...state, channels: action.payload };
    case 'SET_ACTIVE_CHANNEL':
      return { ...state, activeChannel: action.payload };

    default:
      return state;
  }
};
export default reducer;
