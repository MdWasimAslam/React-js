import React, { useRef } from "react";

function UncontrolledComponent() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  function handleForm(e) {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    console.log(username, password);
  }

  function handleFormRef(e) {
    e.preventDefault();
    let username = usernameRef.current.value;
    let password = passwordRef.current.value;
    console.log(username, password);
  }

  return (
    <div>
      <h1>UncontrolledComponent</h1>
      <div>
        <form action="" method="post" onSubmit={handleForm}>
          <input id="username" type="text" placeholder="Enter Username" />
          <input id="password" type="password" placeholder="Enter Paassword" />
          <button>Submit</button>
        </form>
      </div>

      <hr></hr>

      <div>
        <form action="" method="post" onSubmit={handleFormRef}>
          <input ref={usernameRef} type="text" placeholder="Enter Username" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Paassword"
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UncontrolledComponent;
