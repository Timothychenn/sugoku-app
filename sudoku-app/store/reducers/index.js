const initialState = {
  usernameStore: "",
  highScore: [],
};

function reducer(state = initialState, action) {
  if (action.type === "SET_USER_NAME") {
    return { ...state, usernameStore: action.payload };
  }
  if (action.type === "SET_HIGH_SCORE") {
    return { ...state, highScore: state.highScore.concat(action.payload) };
  }
  return state;
}

export default reducer;
