import React from "react";

import QuestionCard from "./QuestionCard";

const QuestionPage = (props) => {
  const { id: questionId } = props.match.params;

  return !!questionId ? (
    <div className="mt-5" style={{ width: "50%", margin: "0 auto" }}>
      <QuestionCard questionId={questionId} showOptions={true} />
    </div>
  ) : null;
};

export default QuestionPage;
