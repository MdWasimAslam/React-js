import React from "react";
import { Link, Outlet } from "react-router";

function Admin() {
  return (
    <div>
      <h1>Admin</h1>
      <Link to={"users"}>Manage Users </Link>
      <Link to={"/"}><button>Go back to Home!</button></Link>
      <Outlet />
    </div>
  );
}

export default Admin;
