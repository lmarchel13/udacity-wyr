import React, { useState } from "react";
import Avatar from "react-avatar";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleAddUserAnswer } from "../actions/users";

import { getAvatarByName } from "../utils";

const OPTIONS = { ONE: "optionOne", TWO: "optionTwo" };
const SELECTED_OPTION_STYLE = "3px solid lightgreen";
const DEFAULT_OPTION_STYLE = "1px solid lightgrey";

const QuestionCard = ({ loading, dispatch, authedUser, users = {}, questions, questionId, showOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();
  const answered = { optionOne: false, optionTwo: false };

  const question = questions[questionId] || {};
  const user = users[question.author] || {};

  const { optionOne, optionTwo } = question;

  if (optionOne && optionOne.votes.includes(authedUser)) answered.optionOne = true;
  if (optionTwo && optionTwo.votes.includes(authedUser)) answered.optionTwo = true;

  const avatar = getAvatarByName(user);

  const isQuestionAnswered = answered.optionOne || answered.optionTwo;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/question/${question.id}`);
  };

  const handleSelectOption = (option) => {
    if (!isQuestionAnswered) setSelectedOption(option);
  };

  const submitVote = (e) => {
    e.preventDefault();

    if (selectedOption) {
      const payload = { authedUser, qid: question.id, answer: selectedOption };

      dispatch(handleAddUserAnswer(payload)).then(() => history.push("/"));
    }
  };

  const getVotesInfo = (optionOne = {}, optionTwo = {}) => {
    if (Object.keys(optionOne).length === 0 || Object.keys(optionTwo).length === 0) return {};
    const votesOptionOne = optionOne.votes.length;
    const votesOptionTwo = optionTwo.votes.length;
    const totalVotes = votesOptionOne + votesOptionTwo;

    return { totalVotes, votesOptionOne, votesOptionTwo };
  };

  const { totalVotes, votesOptionOne = 0, votesOptionTwo = 0 } = getVotesInfo(optionOne, optionTwo);
  const optionOnePercentage = Math.round((votesOptionOne * 100) / totalVotes) || 0;
  const optionTwoPercentage = Math.round((votesOptionTwo * 100) / totalVotes) || 0;

  const isNotReady = loading || (Object.keys(question).length === 0 && Object.keys(user).length === 0);

  return isNotReady ? null : (
    <div
      className="card mb-3"
      style={{
        minHeight: 150,
        maxHeight: 300,
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <div style={{ flex: 1 }}>
        <h5 className="text-center mb-3">Asked by {user.name}</h5>
      </div>
      <div style={{ display: "flex", flex: 3, flexDirection: "row" }}>
        <div style={{ display: "flex", alignSelf: "center", justifyContent: "center", flex: 1 }}>
          <Avatar value={avatar} size={100} round={true} />
        </div>
        <div
          style={{
            display: "flex",
            flex: 3,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {showOptions ? (
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div className="mb-2" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div
                  onClick={() => handleSelectOption(OPTIONS.ONE)}
                  className="mb-1 text-center"
                  style={{
                    flex: 1,
                    border:
                      selectedOption === OPTIONS.ONE || answered.optionOne
                        ? SELECTED_OPTION_STYLE
                        : DEFAULT_OPTION_STYLE,
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "80%",
                    position: "relative",
                    flexDirection: "column",
                  }}
                >
                  <p>{question && question.optionOne && question.optionOne.text}</p>
                  <div className="progress mt-2 mb-2" style={{ width: "70%", margin: "0 auto" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${optionOnePercentage}%` }}
                      aria-valuenow={optionOnePercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {optionOnePercentage} %
                    </div>
                  </div>
                  {isQuestionAnswered ? (
                    <span className="badge badge-primary" style={{ position: "absolute", top: -5, right: -30 }}>
                      {votesOptionOne}/{totalVotes} votes
                    </span>
                  ) : null}
                </div>
                <div
                  onClick={() => handleSelectOption(OPTIONS.TWO)}
                  className="mt-1 text-center"
                  style={{
                    flex: 1,
                    border:
                      selectedOption === OPTIONS.TWO || answered.optionTwo
                        ? SELECTED_OPTION_STYLE
                        : DEFAULT_OPTION_STYLE,
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    justifyContent: "center",
                    width: "80%",
                    position: "relative",
                  }}
                >
                  <p style={{ flex: 1 }}>{question && question.optionTwo && question.optionTwo.text}</p>
                  <div className="progress mt-2 mb-2" style={{ width: "70%", margin: "0 auto" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${optionTwoPercentage}%` }}
                      aria-valuenow={optionTwoPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {optionTwoPercentage} %
                    </div>
                  </div>
                  {isQuestionAnswered ? (
                    <span className="badge badge-primary" style={{ position: "absolute", top: -5, right: -30 }}>
                      {votesOptionTwo}/{totalVotes} votes
                    </span>
                  ) : null}
                </div>
              </div>
              {isQuestionAnswered ? null : (
                <button
                  onClick={submitVote}
                  style={{ width: "70%", margin: "0 auto" }}
                  className="btn btn-primary btn-sm mt-1"
                >
                  Vote
                </button>
              )}
            </div>
          ) : (
            <button style={{ width: "50%" }} className="btn btn-outline-primary btn-sm" onClick={handleClick}>
              View question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ dispatch, authedUser, users, questions, loading }, { questionId, showOptions }) => {
  return {
    dispatch,
    authedUser,
    users,
    showOptions,
    loading: !authedUser,
    questionId,
    questions,
  };
};

export default connect(mapStateToProps)(QuestionCard);
