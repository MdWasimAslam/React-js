import React, { useRef, useState } from "react";

function DerivedState() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  
  const totalUsersCount = users.length;
  const lastUser = users[users.length - 1];
  const uniqueUserCount = [...new Set(users)].length;

  const handleAddUsers = () => {
    setUsers([...users, newUser]);
    setNewUser("");
  };

  return (
    <div>
      <h1>DerivedState</h1>

      <h3>Total Users : {totalUsersCount}</h3>
      <h3>Last User : {lastUser}</h3>
      <h3>Total Unique Users : {uniqueUserCount}</h3>

      <input
        value={newUser}
        type="text"
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Enter User..."
      />
      <button onClick={handleAddUsers}>Add User</button>

      <div>
        {users.map((item, index) => {
          return (
            <div
              style={{
                backgroundColor: "AccentColor",
                margin: "10px 0",
                padding: 10,
                borderRadius: 5,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DerivedState;
