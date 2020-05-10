import { showLoading, hideLoading } from "react-redux-loading";
import { saveAnswer } from "../utils/api";
import { addQuestionUserVote } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const addUserQuestion = (question) => ({
  type: ADD_USER_QUESTION,
  question,
});

export const addUserAnswer = (payload) => ({
  type: ADD_USER_ANSWER,
  ...payload,
});

export const handleAddUserAnswer = (payload) => (dispatch) => {
  dispatch(showLoading());

  return saveAnswer(payload)
    .then(() => dispatch(addUserAnswer(payload)))
    .then(() => dispatch(addQuestionUserVote(payload)))
    .then(() => dispatch(hideLoading()));
};
