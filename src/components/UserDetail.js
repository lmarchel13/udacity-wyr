import React from "react";
import Avatar from "react-avatar";

export default function ({ user }) {
  const { name, avatar, createdQuestions, answeredQuestions, score } = user;

  return (
    <div
      className="card mb-4"
      style={{
        display: "flex",
        flexDirection: "row",
        width: "50%",
        margin: "0 auto",
        boxShadow: "2.5px 2.5px 2.5px lightgrey",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Avatar value={avatar} round={true} size={70} />
      </div>

      <div style={{ flex: 3, display: "flex", flexDirection: "column", borderLeft: "1px solid lightgrey" }}>
        <div style={{ flex: 1, padding: "10px 0px 0px 20px", backgroundColor: "whitesmoke" }}>{name}</div>
        <div style={{ flex: 3, borderTop: "1px solid lightgrey", paddingTop: 10 }}>
          <p style={{ marginLeft: 20 }}>Created questions: {createdQuestions}</p>
          <p style={{ marginLeft: 20 }}>Answered questions: {answeredQuestions}</p>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid lightgrey",
        }}
      >
        <div style={{ border: "1px solid lightgrey", margin: 15, marginBottom: 0 }}>
          <div
            className="text-center"
            style={{ flex: 1, borderBottom: "1px solid lightgrey", backgroundColor: "whitesmoke" }}
          >
            Score
          </div>
          <div style={{ display: "flex", flex: 1, alignSelf: "center", justifyContent: "center", padding: 10 }}>
            <h2>
              <span className="badge badge-pill badge-primary">{score}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
