import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { handleInitialData } from "../actions/shared";
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import Home from "./Home";
import Questions from "./Questions";
import NewQuestion from "./NewQuestion";

function App({ dispatch, loading }) {
  useEffect(() => {
    dispatch(handleInitialData(localStorage.getItem("authedUser")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Route path="/" exact component={Home} />
          {loading ? (
            <Route path="/login" exact component={LoginPage} />
          ) : (
            <div>
              <Route path="/questions" exact component={Questions} />
              <Route path="/new-question" exact component={NewQuestion} />
            </div>
          )}
        </div>
      </Fragment>
    </Router>
  );
}

const mapStateToProps = ({ authedUser }) => ({ loading: !authedUser });

export default connect(mapStateToProps)(App);
