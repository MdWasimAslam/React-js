import React, { createContext, useContext, useState } from "react";
//useContext Hook is used to manage global data in React App.
const AppContext = createContext();

function UseContextHook() {
  const [counter, setCounter] = useState(0);
  return (
    <AppContext.Provider value={counter}>
      <h1>UseContextHook</h1>
      <div>
        <button
          onClick={() => {
            setCounter((prev) => prev + 1);
          }}
        >
          Counter : {counter}
        </button>
        <Child />
      </div>
    </AppContext.Provider>
  );
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  return <SuperGrandChild />;
}

function SuperGrandChild() {
  const value = useContext(AppContext);
  console.log(value);
  return <div>Super Grand Child : {value}</div>;
}

export default UseContextHook;
