import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <header className="container flex space-between">
          <NavLink className="brand" to="/">
            Conduit
          </NavLink>

          {this.props.isLoggedIn ? (
            <AuthHeader user={this.props.user} />
          ) : (
            <NonAuthHeader />
          )}
        </header>
      </>
    );
  }
}

function AuthHeader(props) {
  return (
    <nav className="nav">
      <NavLink activeClassName="active-nav" className="nav-link" to="/" exact>
        Home
      </NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/new-post">
        <i class="ion-compose"></i>New Post
      </NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/settings">
        Settings
      </NavLink>
      <NavLink
        activeClassName="active-nav"
        className="nav-link"
        to={`/profile/${props.user.username}`}
      >
        Profile
      </NavLink>
    </nav>
  );
}
function NonAuthHeader() {
  return (
    <nav className="nav">
      <NavLink activeClassName="active-nav" className="nav-link" to="/" exact>
        Home
      </NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/login">
        Sign in
      </NavLink>
      <NavLink activeClassName="active-nav" className="nav-link" to="/register">
        Sign up
      </NavLink>
    </nav>
  );
}

export default Header;
