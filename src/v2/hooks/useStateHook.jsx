import React, { useEffect, useState } from "react";

// useState is a react hook, which creates an 'state variable'. Which helps us to track state in componnets & updates the user interface when state changes

function UseStateHook() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>UseStateHook</h1>

      <div>
        <h2>Count : {count}</h2>
        <button onClick={() => setCount((prev)=>prev+1)}>Increment</button>
        <button onClick={() => setCount((prev)=>prev-1)}>Decrement</button>
      </div>
    </div>
  );
}

export default UseStateHook;
