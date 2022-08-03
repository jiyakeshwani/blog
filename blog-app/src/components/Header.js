import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <header className="container flex space-between">
          <NavLink className="brand" to="/">
            Conduit
          </NavLink>
          <nav className="nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Sign in
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Sign up
            </NavLink>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
