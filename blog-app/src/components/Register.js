import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

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

    switch (name) {
      case "email":
        let emailError = value.indexOf("@") === -1 ? "Email is not Valid" : "";
        errors.email = emailError;
        break;
      case "password":
        let passwordError;
        if (value.length < 7) {
          passwordError = "Password can not be less than 7 characters";
        }
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
        if (!regex.test(value)) {
          passwordError =
            "Password must contain atleast one character and one number";
        }
        errors.password = passwordError;
        break;
      case "username":
        let usernameError =
          value.length >= 6
            ? " "
            : "Username can not be less than 6 characters";

        errors.username = usernameError;
        break;
      default:
        return errors;
    }

    this.setState({ errors, [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user);
        this.props.updateUser(user);

        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };
  render() {
    return (
      <>
        <section className="register">
          <h4>Sign Up</h4>
          <NavLink className="link" to="/login">
            Have an Account?
          </NavLink>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
              placeholder="Username"
            />
            <p className="error">{this.state.errors.username}</p>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              placeholder="Email"
            />
            <p className="error">{this.state.errors.email}</p>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInput}
              placeholder="Password"
            />
            <p className="error">{this.state.errors.password}</p>
            <button type="submit">Sign Up</button>
          </form>
        </section>
      </>
    );
  }
}

export default withRouter(Register);
