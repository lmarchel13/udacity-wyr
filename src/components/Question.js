import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const OPTIONS = { ONE: "optionOne", TWO: "optionTwo" };

const Question = ({ question, users, authedUser, detail = false }) => {
  const history = useHistory();
  const user = users[question.author];
  const labelStyle = { fontSize: 12 };

  const getColor = (option) => {
    if (!authedUser) return "black";
    return question[option].votes.includes(authedUser) ? "green" : "red";
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/question/${question.id}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <h5 style={{ margin: 0, padding: 10, marginLeft: 15 }}>{user.name} asked</h5>
      <div style={{ display: "flex", flexDirection: "row", padding: 10 }}>
        <div style={{ flex: 1, backgroundColor: "red", display: "flex", marginLeft: 25 }}>
          <img src={user.avatarURL} alt="Avatar" style={{ width: "100%" }} />
        </div>
        <div style={{ flex: 3, textAlign: "center" }}>
          {detail ? (
            <Fragment>
              <p style={{ ...labelStyle, color: getColor(OPTIONS.ONE) }}>{question.optionOne.text}</p>
              <p style={{ ...labelStyle, color: getColor(OPTIONS.TWO) }}>{question.optionTwo.text}</p>
            </Fragment>
          ) : (
            <Fragment>
              <h5>Would you rather...</h5>
              <button onClick={handleClick} style={{ width: 100, padding: 10 }}>
                View poll...
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }, { question, detail }) => {
  return {
    users,
    question,
    authedUser,
    detail,
  };
};

export default connect(mapStateToProps)(Question);
