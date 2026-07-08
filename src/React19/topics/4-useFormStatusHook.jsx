import React from "react";
import { useFormStatus } from "react-dom";

function UseFormStatusHook() {
  const handleSubmit = async () => {
    await new Promise((res) => {
      setTimeout(() => {
        console.log("Data Submitted!");
        res();
      }, 2000);
    });
  };

  return (
    <div>
      <h1>UseFormStatusHook</h1>
      <pre>
        <code>
          useFormStatus is a React Hook that provides the current status of a
          form submission, such as whether the form is currently submitting.
        </code>
      </pre>
      <form action={handleSubmit}>
        <LoginForm />
      </form>
    </div>
  );
}

function LoginForm() {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <>
      <input type="text" name="username" placeholder="Enter Username..." />
      <input type="password" name="password" placeholder="Enter Password..." />
      <button disabled={pending}>Submit</button>
      <div>Form Status : {pending ? "Submitting..." : "Idle"}</div>
    </>
  );
}

export default UseFormStatusHook;
