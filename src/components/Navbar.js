/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { removeAuthedUser } from "../actions/authedUser";

const Navbar = ({ authedUser, dispatch }) => {
  let history = useHistory();

  const handleLogout = () => {
    alert("logout");
    dispatch(removeAuthedUser());
    history.push("/");
  };

  return (
    <div className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        {authedUser ? (
          <Fragment>
            <li>
              <NavLink to="/new-question" exact activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to="/questions" exact activeClassName="active">
                Questions
              </NavLink>
            </li>

            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Navbar);
