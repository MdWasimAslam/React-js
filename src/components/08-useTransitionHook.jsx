import React, { startTransition, useState, useTransition } from "react";

function UseTransitionHook() {
  const [pending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      await new Promise((res) =>
        setTimeout(() => {
          console.log("Submitted Successfully!");
          res();
        }, 2000),
      );
    });
  };
  return (
    <div>
      <h1>UseTransitionHook</h1>
      <button onClick={handleSubmit} disabled={pending}>
        {pending ? "Submitting" : "Submit"}
      </button>
    </div>
  );
}

export default UseTransitionHook;
