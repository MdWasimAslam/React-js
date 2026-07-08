import React, { useState, useTransition } from "react";

function UseTransitionHook() {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await new Promise((res) => {
        setTimeout(() => {
          console.log("Promised Resolved!");
          res();
        }, 3000);
      });
    });
  }

  return (
    <div>
      <h1>UseTransitionHook</h1>
      <button disabled={pending} onClick={handleClick}>
        Click
      </button>
    </div>
  );
}

export default UseTransitionHook;
