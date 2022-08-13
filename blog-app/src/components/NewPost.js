import React from "react";

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
          <button type="submit">Publish Article</button>
        </fieldset>
      </form>
    );
  }
}

export default NewPost;
