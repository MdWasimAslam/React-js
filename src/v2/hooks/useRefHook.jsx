import React, { useEffect, useRef, useState } from "react";

// useRef is a Hook that allow us to create mutable variable which will not re-render the component.
function UseRefHook() {
  const [counter, setCounter] = useState(0);
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  console.log("Render");
  useEffect(() => {
    let debounce = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      clearTimeout(debounce);
    };
  }, []);

  return (
    <div>
      <h1>UseRefHook</h1>

      <div>
        <div>
          <div>Count : {count}</div>
          <button onClick={() => setCounter((prev) => prev + 1)}>
            Counter : {counter}
          </button>
        </div>
        <input placeholder="Enter Text...." ref={inputRef} />
        <button
          onClick={() => {
            console.log(inputRef?.current?.value);
          }}
        >
          Console
        </button>
      </div>
    </div>
  );
}

export default UseRefHook;
