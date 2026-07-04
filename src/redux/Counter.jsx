import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";
import MiniComponent from "./MiniComponent";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrementClick() {
    dispatch(increment());
  }

  function handleDecrementClick() {
    dispatch(decrement());
  }
  return (
    <div>
      <button onClick={handleIncrementClick}>Increment</button>
      <div>
        <h3>Count : {count}</h3>
      </div>
      <button onClick={handleDecrementClick}>Decrement</button>
      <MiniComponent/>
    </div>
  );
}

export default Counter;
