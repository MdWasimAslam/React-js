import React, { Suspense, use, useEffect } from "react";

const fetchUsers = async () => {
  const response = await fetch(
    "https://api-hub-wasim.vercel.app/users?page=1&limit=10",
  );
  return response.json();
};

function UseHook() {
  const usersPromise = fetchUsers();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <h1>UseHook</h1>
      <Child usersPromise={usersPromise} />
    </Suspense>
  );
}

function Child({ usersPromise }) {
  const users = use(usersPromise);
  console.log(users);
  return <div>Child Component</div>;
}
export default UseHook;
