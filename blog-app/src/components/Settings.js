import React from "react";
import { withRouter } from "react-router-dom";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      username: "",
      bio: "",
      email: "",
      newPassword: "",
      errors: {
        imageUrl: "",
        username: "",
        bio: "",
        email: "",
        newPassword: "",
      },
    };
  }
  componentDidMount() {
    let { username, email, imageUrl, bio } = this.props.user;
    this.setState({ username, email, imageUrl, bio });
  }
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let { imageUrl, username, bio, email, newPassword } = this.state;
    console.log("submitted");
    fetch(` https://mighty-oasis-08080.herokuapp.com/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: {
          imageUrl,
          username,
          bio,
          email,
          newPassword,
        },
      }),
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

        this.props.history.push("/profile");
      })
      .catch((errors) => console.log(errors));
  };
  render() {
    let { imageUrl, username, bio, email, newPassword, errors } = this.state;
    return (
      <>
        <div className="container settings">
          <h5 className="center">Settings</h5>
          <form className="container settings" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={imageUrl}
              placeholder="URL of the image"
              onChange={this.handleChange}
              name="imageUrl"
            />
            <span>{errors.imageUrl}</span>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={this.handleChange}
              name="username"
            />
            <span>{errors.username}</span>
            <input
              type="text"
              value={bio}
              placeholder="Short bio about you"
              onChange={this.handleChange}
              name="bio"
            />
            <span>{errors.bio}</span>
            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={this.handleChange}
              name="email"
            />
            <span>{errors.email}</span>
            <input
              type="text"
              value={newPassword}
              placeholder="New Password"
              onChange={this.handleChange}
              name="newPassword"
            />
            <span>{errors.newPassword}</span>
            <button className="settings-button" type="submit">
              Update Settings
            </button>
          </form>
          <hr />
          <button className="logout" onClick={this.handleLogout}>
            Or click here to logout
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(Settings);
