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
            <NavLink
              activeClassName="active-nav"
              className="nav-link"
              to="/"
              exact
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="active-nav"
              className="nav-link"
              to="/login"
            >
              Sign in
            </NavLink>
            <NavLink
              activeClassName="active-nav"
              className="nav-link"
              to="/register"
            >
              Sign up
            </NavLink>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
