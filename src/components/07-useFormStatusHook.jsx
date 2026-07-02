import React from "react";
import { useFormStatus } from "react-dom";

function UseFormStatusHook() {
  const handleSubmit = async () => {
    await new Promise((res) => setTimeout(res, 2000));
    console.log("Submitted Successfully!");
  };
  return (
    <div>
      <h1>UseFormStatusHook</h1>
      <form action={handleSubmit}>
        <input type="text" placeholder="Enter Username..." />
        <input type="password" placeholder="Enter Password..." />
        <SubmitButton handleSubmit={handleSubmit} />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <button disabled={pending}>{pending ? "Submiting..." : "Submit"}</button>
    </div>
  );
}

export default UseFormStatusHook;
