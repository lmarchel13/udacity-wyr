import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

import { showLoading, hideLoading } from "react-redux-loading";

const AUTHED_ID = "tylermcginnis";

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading());

  return getInitialData().then(({ users, questions }) => {
    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
    dispatch(setAuthedUser(AUTHED_ID));
    dispatch(hideLoading());
  });
};
