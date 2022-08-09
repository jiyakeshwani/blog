import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

class Login extends React.Component {
  constructor(props) {
    super(props);
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

      default:
        return errors;
    }

    this.setState({ [name]: value, errors });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    const { email, password } = this.state;

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: { email, password },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then(({ errors }) => this.setState({ errors }));
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user);
        this.setState({ email: "", password: "" });
      });
  };
  render() {
    return (
      <>
        <Header />
        <section className="login">
          <h4>Sign In</h4>
          <NavLink className="link" to="/register">
            Need an Account?
          </NavLink>
          <form className="form">
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <p className="error">{this.state.errors.email}</p>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <p className="error">{this.state.errors.password}</p>
            <button
              disabled={this.state.errors.email || this.state.errors.password}
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default Login;
