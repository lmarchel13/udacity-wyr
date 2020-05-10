import { RECEIVE_USERS, SET_USER_ANSWER, ADD_USER_QUESTION } from "../actions/users";

import { saveAnswer } from "../utils/api";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SET_USER_ANSWER:
      const { authedUser, question, selectedOption } = action;
      saveAnswer({ authedUser, qid: question.id, answer: selectedOption });

      return state;
    case ADD_USER_QUESTION:
      const { id, author } = action.question;
      console.log({ id, author, state });
      return { ...state, [author]: { ...state[author], questions: [...state[author].questions, id] } };
    default:
      return state;
  }
};
