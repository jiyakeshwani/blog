import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Validate from "./Validate";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <>
        <Header />
        <section className="login">
          <h4>Sign In</h4>
          <NavLink to="/register">Need an Account?</NavLink>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <button>Sign in</button>
          </form>
        </section>
      </>
    );
  }
}

export default Login;
