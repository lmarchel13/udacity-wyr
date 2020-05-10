import React from "react";
import { connect } from "react-redux";
import { getAvatarByName } from "../utils";
import UserDetail from "./UserDetail";

const LeaderBoard = ({ users = {} }) => {
  const results = Object.values(users)
    .map((user) => {
      const { answers, name, questions, id } = user;
      const answeredQuestions = Object.keys(answers).length;
      const createdQuestions = Object.keys(questions).length;
      const avatar = getAvatarByName(user);
      const score = answeredQuestions + createdQuestions;

      return { name, answeredQuestions, createdQuestions, avatar, id, score };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="mt-5">
      {results.map((user) => (
        <UserDetail key={user.id} user={user} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(LeaderBoard);
