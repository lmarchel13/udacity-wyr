import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_USER_VOTE } from "../actions/questions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      const { question } = action;
      return { ...state, [question.id]: question };

    case ADD_QUESTION_USER_VOTE:
      const { qid, authedUser, answer } = action.payload;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser],
          },
        },
      };

    default:
      return state;
  }
};
