import React, { useState } from "react";

function LiftingStateUp() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  return (
    <div>
      <h1>LiftingStateUp</h1>
      <AddUser
        users={users}
        setUsers={setUsers}
        setNewUser={setNewUser}
        newUser={newUser}
      />
      <DisplayUser users={users} />
    </div>
  );
}

function AddUser({ users, setUsers, setNewUser, newUser }) {
  return (
    <div
      style={{
        backgroundColor: "#333",
        margin: "10px 0",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <h3>Add User</h3>
      <input
        onChange={(e) => {
          setNewUser(e.target.value);
        }}
        placeholder="Enter User..."
        value={newUser}
      />
      <button
        onClick={() => {
          setUsers([...users, newUser]);
          setNewUser("");
        }}
      >
        Add User
      </button>
    </div>
  );
}

function DisplayUser({ users }) {
  return (
    <div
      style={{
        backgroundColor: "#333",
        margin: "10px 0",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <h3>Display Users</h3>
      {users.map((item) => {
        return (
          <div
            style={{
              backgroundColor: "AccentColor",
              margin: "10px 0",
              padding: 10,
              borderRadius: 10,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default LiftingStateUp;
