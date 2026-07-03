import React from "react";
import { Link, Outlet } from "react-router";

function ManageUsers() {
  return (
    <div>
      <h1>ManageUsers</h1>
      <Link to="deletedUser">
        <button>Deleted Users</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default ManageUsers;
