/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { removeAuthedUser } from "../actions/authedUser";

const Navbar = ({ authedUser, dispatch }) => {
  let history = useHistory();

  const handleLogout = () => {
    dispatch(removeAuthedUser());
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: "2px solid black" }}>
      <ul className="navbar-nav" style={{ margin: "0 auto" }}>
        <li className="nav-item mr-3">
          <NavLink className="nav-link" to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>

        {authedUser ? (
          <Fragment>
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/new-question" exact activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/leaderboard" exact activeClassName="active">
                Leader Board
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="nav-item mr-3">
              <NavLink className="nav-link" to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Navbar);
