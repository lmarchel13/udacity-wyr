import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ dispatch, authedUser }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOneText || !optionTwoText) return;

    dispatch(handleAddQuestion({ author: authedUser, optionOneText, optionTwoText })).then(() => history.push("/"));
  };

  return !authedUser ? (
    <h1>Please, log in first to create a new question.</h1>
  ) : (
    <div
      className="mt-5"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "0 auto",
        backgroundColor: "whitesmoke",
        boxShadow: "2.5px 2.5px 2.5px lightgrey",
        padding: 15,
      }}
    >
      <div style={{ flex: 1 }}>
        <h3 className="text-center">Create a new question</h3>
      </div>
      <div style={{ flex: 4, padding: 20 }}>
        <h5>Would you rather...</h5>
        <div className="input-group input-group-sm mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
          />
        </div>
        <p className="text-center">or</p>
        <div className="input-group input-group-sm mt-3">
          <input
            type="text"
            className="form-control"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
          />
        </div>

        <div className="mt-3" style={{ width: "60%", margin: "0 auto" }}>
          <button onClick={handleSubmit} className="btn btn-primary btn-sm" style={{ width: "100%" }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(NewQuestion);
