import React, { createContext, useContext, useState } from "react";

// Create Context
const UserContext = createContext();

function UseContext() {
  const [userData, setUserData] = useState({
    name: "Wasim",
    age: 27,
  });

  function changeUser() {
    setUserData({ ...userData, name: "Sheeza", age: 26 });
  }

  return (
    <div>
      <h1>UseContext</h1>

      <UserContext.Provider value={{ userData, changeUser }}>
        <Profile />
      </UserContext.Provider>
    </div>
  );
}

function Profile() {
  const { userData, changeUser } = useContext(UserContext);
  return (
    <>
      <h3>Name: {userData?.name}</h3>
      <h3>Age: {userData?.age}</h3>

      <button onClick={changeUser}>Change User</button>
    </>
  );
}

export default UseContext;
