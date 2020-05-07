import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

export const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
    users,
    questions,
  }));
};

export const saveQuestion = (question) => _saveQuestion(question);

export const saveAnswer = ({ authedUser, qid, answer }) => _saveQuestionAnswer({ authedUser, qid, answer });
