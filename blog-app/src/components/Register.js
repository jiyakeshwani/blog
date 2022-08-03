import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  }
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <>
        <Header />
        <section className="register">
          <h4>Sign Up</h4>
          <NavLink to="/login">Have an Account?</NavLink>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              placeholder="Password"
            />
            <button>Sign Up</button>
          </form>
        </section>
      </>
    );
  }
}

export default Register;
