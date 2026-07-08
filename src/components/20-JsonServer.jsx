import React, { useEffect, useState } from "react";

const emptyUser = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  phone: "",
};

const fields = [
  { id: "firstName", label: "First Name", type: "text" },
  { id: "lastName", label: "Last Name", type: "text" },
  { id: "age", label: "Age", type: "number" },
  { id: "email", label: "Email", type: "email" },
  { id: "phone", label: "Phone", type: "number" },
];

function JsonServer() {
  const url = "http://localhost:3000/users";
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyUser);

  const getUserData = async () => {
    let response = await fetch(url);
    response = await response.json();
    setUserData(response);
    setLoading(false);
  };

  const addUser = async () => {
    let response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      getUserData();
      setUser(emptyUser);
    }
  };

  const deleteUser = async (id) => {
    let response = await fetch(`${url}/${id}`, { method: "DELETE" });
    if (response.ok) getUserData();
  };

  const saveEdit = async (id) => {
    let response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (response.ok) {
      setEditingId(null);
      getUserData();
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>JSON Server</h1>
      <div>
        <button onClick={addUser}>Add User</button>
        <div style={{ display: "flex", gap: 15, margin: "20px 0" }}>
          {fields.map((f) => (
            <input
              key={f.id}
              value={user[f.id]}
              id={f.id}
              type={f.type}
              placeholder={`Enter ${f.label}...`}
              onChange={(e) => setUser({ ...user, [f.id]: e.target.value })}
            />
          ))}
        </div>
      </div>

      <div>
        {userData && userData.length > 0 && !loading ? (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Id</th>
                {fields.map((f) => (
                  <th key={f.id}>{f.label}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {editingId === item.id ? (
                    <>
                      {fields.map((f) => (
                        <td key={f.id}>
                          <input
                            value={editForm[f.id]}
                            type={f.type}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                [f.id]: e.target.value,
                              })
                            }
                          />
                        </td>
                      ))}
                      <td>
                        <button onClick={() => saveEdit(item.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {fields.map((f) => (
                        <td key={f.id}>{item[f.id]}</td>
                      ))}
                      <td>
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditForm(item);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteUser(item.id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default JsonServer;
