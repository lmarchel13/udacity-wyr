import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from "../actions/users";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER_QUESTION:
      const { id, author } = action.question;
      return { ...state, [author]: { ...state[author], questions: [...state[author].questions, id] } };
    case ADD_USER_ANSWER:
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
};
