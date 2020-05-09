import React, { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";

import { getAvatarByName } from "../utils";

const LoginPage = ({ users = [], dispatch }) => {
  const [user, setUser] = useState();
  const [avatar, setAvatar] = useState();
  const history = useHistory();

  const onChange = (e) => {
    const { value } = e.target;

    if (value) {
      setUser(value);
      setAvatar(getAvatarByName(users[value]));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(user));
    history.push("/");
  };

  return (
    <div
      className="mt-5"
      style={{
        width: "40%",
        margin: "0 auto",
        padding: 30,
        backgroundColor: "whitesmoke",
        boxShadow: "2.5px 2.5px 2.5px lightgrey",
      }}
    >
      <form class="form-signin">
        <div style={{ marginLeft: "32.5%" }}>
          <Avatar round={true} value={avatar} />
        </div>
        <h1 class="h3 mt-3 mb-3 font-weight-normal text-center">Please sign in</h1>

        <div style={{ width: "70%", margin: "0 auto" }}>
          <select class="custom-select" onChange={onChange}>
            <option selected>Select an user</option>
            {Object.values(users).map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          disabled={!user}
          style={{ width: "30%", margin: "0 auto" }}
          class="mt-3 btn btn-sm btn-primary btn-block"
          onClick={onSubmit}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, dispatch }) => ({
  authedUser,
  users,
  dispatch,
});

export default connect(mapStateToProps)(LoginPage);
