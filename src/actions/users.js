export const RECEIVE_USERS = "RECEIVE_USERS";
export const SET_USER_ANSWER = "SET_USER_ANSWER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const setUserAnswer = (payload) => ({
  type: SET_USER_ANSWER,
  ...payload,
});
