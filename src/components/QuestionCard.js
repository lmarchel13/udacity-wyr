import React, { useState } from "react";
import Avatar from "react-avatar";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { getAvatarByName } from "../utils";
import { setQuestionAnswer } from "../actions/questions";
import { setUserAnswer } from "../actions/users";

const OPTIONS = { ONE: "optionOne", TWO: "optionTwo" };

const QuestionCard = ({ dispatch, authedUser, user = {}, question = {}, showOptions }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const avatar = getAvatarByName(user);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/question/${question.id}`);
  };

  const submitVote = (e) => {
    e.preventDefault();

    if (selectedOption) {
      const payload = { authedUser, question, selectedOption };
      dispatch(setQuestionAnswer(payload));
      dispatch(setUserAnswer(payload));
      history.push(`/`);
    }
  };

  return (
    <div
      className="card mb-3"
      style={{
        minHeight: 150,
        maxHeight: 200,
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <div style={{ flex: 1 }}>
        <h5 className="text-center">Asked by {user.name}</h5>
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
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
              <div
                className="mb-2"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={() => setSelectedOption(OPTIONS.ONE)}
                  className="mr-1 text-center"
                  style={{
                    flex: 1,
                    border: selectedOption === OPTIONS.ONE ? "2px solid green" : "1px solid lightgrey",
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>{question.optionOne.text}</p>
                </div>
                <div
                  onClick={() => setSelectedOption(OPTIONS.TWO)}
                  className="ml-1 text-center"
                  style={{
                    flex: 1,
                    border: selectedOption === OPTIONS.TWO ? "2px solid green" : "1px solid lightgrey",
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>{question.optionTwo.text}</p>
                </div>
              </div>
              <button
                onClick={submitVote}
                style={{ width: "70%", margin: "0 auto" }}
                className="btn btn-primary btn-sm"
              >
                Vote
              </button>
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

const mapStateToProps = ({ dispatch, authedUser, users }, { question = {}, showOptions }) => {
  const user = users[question.author];
  return { dispatch, authedUser, user, question, showOptions };
};

export default connect(mapStateToProps)(QuestionCard);
