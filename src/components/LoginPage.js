import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useHistory } from "react-router-dom";

const LoginPage = ({ users = [], dispatch }) => {
  const AVATAR_PLACEHOLDER = "https://api.adorable.io/avatars/285/placeholder@adorable.png";
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState(AVATAR_PLACEHOLDER);
  const history = useHistory();

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setUser(value);
      setAvatar(users[value].avatarURL);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(user));
    history.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        margin: "0 auto",
        padding: 15,
        border: "0.8px solid grey",
        marginTop: "2rem",
        paddingBottom: 40,
      }}
    >
      <h1 className="center">Log in</h1>
      <img src={avatar} alt="Avatar" width="150" height="150" style={{ margin: "0 auto", marginBottom: "2rem" }} />
      <select
        onChange={onChange}
        value={user}
        style={{
          height: 30,
          width: 250,
          margin: "0 auto",
        }}
      >
        <option value={user} style={{ textAlign: "center" }}>
          Select an user
        </option>
        {Object.values(users).map((user) => {
          return (
            <option key={user.id} value={user.id} style={{ textAlign: "center" }}>
              {user.name}
            </option>
          );
        })}
      </select>
      <button
        disabled={!user}
        onClick={onSubmit}
        style={{
          width: 100,
          margin: "0 auto",
          marginTop: 20,
          color: "white",
          backgroundColor: "grey",
        }}
      >
        Sign in
      </button>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, dispatch }) => ({
  authedUser,
  users,
  dispatch,
});

export default connect(mapStateToProps)(LoginPage);
