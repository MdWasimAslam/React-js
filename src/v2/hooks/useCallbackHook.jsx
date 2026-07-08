import React, { useCallback, useState } from "react";
// useCallback is a react hook that lets you cache a functional defination between re-renders. it means, when we use the useCallback Hook, it does not create multiple instances of the same function when re-render happens.

function UseCallbackHook() {
  const [counter, setCounter] = useState(0);

  const ChildFunc = useCallback(() => {
    console.log("Child Function Called!");
  }, []);

  return (
    <div>
      <h1>UseCallbackHook</h1>
      <Child ChildFunc={ChildFunc} />
      <div>
        <button onClick={() => setCounter((prev) => prev + 1)}>
          Counter : {counter}
        </button>
      </div>
    </div>
  );
}

const Child = React.memo((props) => {
  console.log("Child Re-rendered!");
  return <h3>Header Rendered!</h3>;
});

export default UseCallbackHook;
