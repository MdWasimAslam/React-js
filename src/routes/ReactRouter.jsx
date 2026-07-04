import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import HomeRoute from "./Pages/HomeRoute";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/NotFound";
import Admin from "./Pages/Admin";
import ManageUsers from "./Pages/Admin/ManageUsers";
import DeletedUser from "./Pages/Admin/DeletedUser";
import Employees from "./Pages/Employees";

function ReactRouter() {
  return (
    <BrowserRouter>
      {/* <div>
        <Navbar />
      </div> */}
      <Routes>
       <Route Component={Navbar}>
         <Route path="/" Component={HomeRoute} />
        <Route path="/products" Component={Products} />
        <Route path="/about" Component={About} />
        <Route path="/employees" Component={Employees} />
        <Route path="/employees/:id" Component={Employees} />
       </Route>

        {/* Admin */}
        <Route path="/admin" Component={Admin}>
          <Route path="users" Component={ManageUsers}>
            <Route path="deletedUser" Component={DeletedUser} />
          </Route>
        </Route>

        {/* Error Routes */}
        <Route path="/*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouter;
