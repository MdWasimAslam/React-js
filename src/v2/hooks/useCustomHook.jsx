import React, { useState } from "react";

function UseCustomHook() {
  const { counter,increaseCount,decreaseCounter,resetCounter } = useCounter();

  return (
    <div>
      <h1>UseCustomHook</h1>
      <h3>Count : {counter}</h3>
      <button onClick={increaseCount}>Increment</button>
      <button onClick={decreaseCounter}>Decrement</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
  );
}

function useCounter() {
  const [counter, setCounter] = useState(0)
  return {
    increaseCount : ()=>{setCounter(prev=>prev+1)},
    decreaseCounter : ()=>{setCounter(prev=>prev-1)},
    resetCounter : ()=>{setCounter(0)},
    counter,
  }
}
export default UseCustomHook;
