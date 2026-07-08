import React, { useReducer } from "react";


// useReducer is a React Hook used to manage complex state. Instead of updating state directly, we dispatch an action to a reducer function, and the reducer returns the new state.


function UseReducerHook() {
  const initialValue = { count: 0 };

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "increment":
        return {
          ...state,
          count: state.count + 1,
        };

      case "decrement":
        return {
          ...state,
          count: state.count - 1,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFunc, initialValue);

  return (
    <div>
      <h1>UseReducerHook</h1>

      <div>
        <h3>Counter : {state.count}</h3>
        <button onClick={() => dispatch({ type: "increment" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export default UseReducerHook;
