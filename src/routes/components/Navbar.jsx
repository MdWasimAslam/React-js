import React from "react";
import { Link, Outlet } from "react-router";

function Navbar() {
  const linkStyle = {
    color: "#94a3b8",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 16px",
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 24px",
          backgroundColor: "#0f172a",
          borderBottom: "1px solid #1e293b",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <Link
          to="/"
          style={{
            ...linkStyle,
            color: "#f8fafc",
            fontWeight: "700",
            paddingLeft: 0,
          }}
        >
          StoreApp
        </Link>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/products" style={linkStyle}>
          Products
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
         <Link to="/employees" style={linkStyle}>
          Employees
        </Link>
        <Link to="/admin" style={linkStyle}>
          Admin
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
