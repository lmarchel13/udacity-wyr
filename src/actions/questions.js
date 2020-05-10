import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion } from "../utils/api";
import { addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const setQuestionAnswer = (payload) => ({
  type: SET_QUESTION_ANSWER,
  ...payload,
});

export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});

export const handleAddQuestion = (payload) => (dispatch, getState) => {
  dispatch(showLoading());

  return saveQuestion(payload)
    .then((question) => dispatch(addQuestion(question)))
    .then(({ question }) => dispatch(addUserQuestion(question)))
    .then(() => dispatch(hideLoading()));
};
