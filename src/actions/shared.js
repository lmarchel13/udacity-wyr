import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

import { showLoading, hideLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";

export const handleInitialData = (authedUser) => (dispatch) => {
  if (authedUser) dispatch(setAuthedUser(authedUser));
  dispatch(showLoading());

  return getInitialData().then(({ users, questions }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(hideLoading());
  });
};
