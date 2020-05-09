import { RECEIVE_USERS, SET_USER_ANSWER } from "../actions/users";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SET_USER_ANSWER:
      const { authedUser, question, selectedOption } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [question.id]: selectedOption,
          },
        },
      };
    default:
      return state;
  }
};
