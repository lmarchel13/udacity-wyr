import { RECEIVE_QUESTIONS, SET_QUESTION_ANSWER } from "../actions/questions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SET_QUESTION_ANSWER:
      const { authedUser, question, selectedOption } = action;

      return {
        ...state,
        [question.id]: {
          ...question,
          [selectedOption]: {
            ...question[selectedOption],
            votes: [...question[selectedOption].votes, authedUser],
          },
        },
      };
    default:
      return state;
  }
};
