const defaultState = {
  basket: 0,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, basket: action.payload };
    case 'DECREMENT':
      return { ...state, basket: action.payload };
    default: return state;
  }
};

export default reducer;
