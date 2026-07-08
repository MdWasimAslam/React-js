import React, { useActionState } from "react";

function UseActionstateHook() {
  const handleSubmit = async (prevData, formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    await new Promise((res) => {
      setTimeout(() => {
        console.log("promise resolved!");

        console.log({
          username,
          password,
        });

        res();
      }, 3000);
    });

    if (username && password) {
      return {
        message: "Data Submitted Successfully",
        type: "success",
        username,
        password,
      };
    } else {
      return { message: "Username or Password Missing", type: "error" };
    }
  };

  const [data, action, pending] = useActionState(handleSubmit, undefined);

  return (
    <div>
      <h1>UseActionstateHook</h1>
      <pre>
        <code>
          useActionState is a React Hook that helps manage the state of an
          action, such as a form submission. It automatically tracks the result
          returned by the action and updates the UI.
        </code>
      </pre>

      <div>
        <form action={action}>
          <input
            // defaultValue={data?.username}
            type="text"
            placeholder="Enter username..."
            name="username"
          />
          <input
            // defaultValue={data?.password}
            type="password"
            placeholder="Enter password..."
            name="password"
          />
          <button disabled={pending}>Submit</button>
          <div style={{ color: data?.type === "success" ? "green" : "red" }}>
            {data && data?.message}
          </div>
          {data?.type === "success" && (
            <>
              <div>
                <h4>Username : {data?.username}</h4>
                <h4>Password : {data?.password}</h4>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default UseActionstateHook;
