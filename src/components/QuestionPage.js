import React from "react";
import { connect } from "react-redux";

import QuestionCard from "./QuestionCard";

const QuestionPage = ({ question }) => {
  return !!question ? (
    <div className="mt-5" style={{ width: "50%", margin: "0 auto" }}>
      <QuestionCard question={question} showOptions={true} />
    </div>
  ) : null;
};

const mapStateToProps = ({ questions }, props) => {
  const { id } = props.match.params;
  const question = questions[id];

  return { question };
};

export default connect(mapStateToProps)(QuestionPage);
