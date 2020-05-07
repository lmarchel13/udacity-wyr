import { combineReducers } from "redux";
import { loadingBarReducer as loadingBar } from "react-redux-loading";

import users from "./users";
import questions from "./questions";
import authedUser from "./authedUser";

export default combineReducers({ users, questions, authedUser, loadingBar });
