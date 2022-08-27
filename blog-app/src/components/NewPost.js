import React from "react";
import { withRouter } from "react-router-dom";

class NewPost extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      about: "",
      body: "",
      tags: "",
      errors: {
        title: "",
        about: "",
        body: "",
        tags: "",
      },
    };
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    this.setState({
      [name]: value,
      errors,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    let { title, body, about, tags } = this.state;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          about,
          body,
          tags: tags.split(",").map((tag) => tag.trim()),
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
      .then(({ article }) => {
        console.log(article);
        this.setState({
          title: "",
          about: "",
          body: "",
          tags: "",
        });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };
  render() {
    let { errors } = this.state;
    return (
      <form className="new-post container">
        <fieldset>
          <input
            type="text"
            name="title"
            placeholder="Article Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <span className="error">{errors.title}</span>
          <input
            type="text"
            name="about"
            placeholder="what's this article about?"
            value={this.state.about}
            onChange={this.handleChange}
          />
          <span className="error">{errors.about}</span>
          <input
            type="text"
            name="body"
            placeholder="  Write your article (in markdown)"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <span className="error">{errors.body}</span>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tags"
            value={this.state.tags}
            onChange={this.handleChange}
          />
          <span className="error">{errors.tags}</span>
          <button type="submit" onClick={this.handleSubmit}>
            Publish Article
          </button>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(NewPost);
