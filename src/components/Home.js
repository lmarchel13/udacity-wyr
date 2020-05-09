/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const titleStyle = { textAlign: "center", marginTop: 5 };
const TABS = { ANSWERED: "ANSWERED", UNANSWERED: "UNANSWERED" };
const defaultClass = "nav-item nav-link mr-1";

const Home = ({ authedUser, user, answeredQuestions, unansweredQuestions }) => {
  const [tab, setTab] = useState(TABS.UNANSWERED);
  const title = user ? <h1 style={titleStyle}>Welcome, {user.name}</h1> : <h1 style={titleStyle}>Home</h1>;

  return (
    <Fragment>
      {authedUser ? (
        <Fragment>
          {title}
          <div className="mt-4" style={{ width: "50%", margin: "0 auto" }}>
            <nav className="nav nav-fill mb-2">
              <a
                className={`${defaultClass} ${tab === TABS.UNANSWERED ? "active" : ""}`}
                onClick={() => setTab(TABS.UNANSWERED)}
              >
                Unanswered
              </a>
              <a
                className={`${defaultClass} ${tab === TABS.ANSWERED ? "active" : ""}`}
                onClick={() => setTab(TABS.ANSWERED)}
              >
                Answered
              </a>
            </nav>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {tab === TABS.ANSWERED &&
                answeredQuestions.map((question) => <QuestionCard key={question.id} question={question} />)}
              {tab === TABS.UNANSWERED &&
                unansweredQuestions.map((question) => <QuestionCard key={question.id} question={question} />)}
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="jumbotron jumbotron-fluid mt-4 text-center" style={{ width: "50%", margin: "0 auto" }}>
          <div className="container">
            <h1 className="display-4">Would you rather?</h1>
            <p className="lead">Please, log in and start answering the questions :)</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ users = {}, authedUser, questions }) => {
  const answeredQuestions = [];
  const unansweredQuestions = [];

  const user = users[authedUser];

  if (user) {
    Object.values(questions).map((question) => {
      const { id } = question;
      Object.keys(user.answers).includes(id) ? answeredQuestions.push(question) : unansweredQuestions.push(question);
    });

    answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
    unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  }

  return { authedUser, user, answeredQuestions, unansweredQuestions };
};

export default connect(mapStateToProps)(Home);
