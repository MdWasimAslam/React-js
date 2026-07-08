import { useEffect, useOptimistic, useState, useTransition } from "react";

export default function UseOptimisticHook() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [optimisticUsers, addOptimisticUser] = useOptimistic(users);
  const [pending, startTransition] = useTransition();

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/users").then((res) =>
      res.json(),
    );
    setUsers(response);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = () => {
    startTransition(async () => {
      addOptimisticUser((prev) => [...prev, { name }]);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify({ name }),
      });

      setName("");
      getUsers();
    });
  };

  return (
    <div>
      <h1>useOptimistic</h1>

      <pre>
        <code>
          useOptimistic updates the UI immediately before the server responds.
          If the request fails, React can revert the optimistic update.
        </code>
      </pre>

      <input
        placeholder="Enter Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button disabled={pending} onClick={addUser}>
        {pending ? "Adding to API..." : "Add User"}
      </button>

      {optimisticUsers.map((user, index) => (
        <div
          key={user.id || index}
          style={{
            border: "1px solid #555",
            padding: 10,
            margin: "10px 0",
            borderRadius: 5,
          }}
        >
          <strong>{user.name}</strong>
        </div>
      ))}
    </div>
  );
}
