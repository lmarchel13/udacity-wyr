export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SET_QUESTION_ANSWER = "SET_QUESTION_ANSWER";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const setQuestionAnswer = (payload) => ({
  type: SET_QUESTION_ANSWER,
  ...payload,
});
