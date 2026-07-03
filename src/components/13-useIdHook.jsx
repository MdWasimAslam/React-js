import React, { useId } from "react";

function UseIdHook() {
  const id = useId();
  const id2 = useId();

  return (
    <div>
      <h1>UseIdHook</h1>
      <div>{id}</div>
      <div>{id2}</div>
    </div>
  );
}

export default UseIdHook;
