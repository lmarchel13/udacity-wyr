import React from "react";
import { connect } from "react-redux";

import QuestionCard from "./QuestionCard";
import NotFound from "./NotFound";

const QuestionPage = ({ questionId, authedUser }) => {
  return questionId && authedUser ? (
    <div className="mt-5" style={{ width: "50%", margin: "0 auto" }}>
      <h3 className="text-center">Would you rather?</h3>
      <QuestionCard questionId={questionId} showOptions={true} />
    </div>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = ({ authedUser }, props) => {
  const { id: questionId } = props.match.params;

  return { questionId, authedUser };
};

export default connect(mapStateToProps)(QuestionPage);
