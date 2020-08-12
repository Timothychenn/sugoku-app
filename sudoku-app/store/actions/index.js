export const setUserName = (name) => {
  return { type: "SET_USER_NAME", payload: name };
};

export const setHighscore = (data) => {
  return { type: "SET_HIGH_SCORE", payload: data };
};
