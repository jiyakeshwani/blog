import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      error: "",
    };
  }

  componentDidMount() {
    let slug = this.props.match.params.slug;
    console.log(slug);
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((article) => {
        this.setState({
          article: article.article,
          error: "",
        });
      })
      .catch((err) => {
        this.setState({ error: "articles not found!" });
      });
  }
  render() {
    console.log(this.state.article);
    return (
      <>
        <Header />

        {this.state.article ? (
          <>
            <section className="article-hero">
              <div className="container">
                <h4 className="h4">{this.state.article.title}</h4>
                <div className="flex">
                  <figure className="article-img">
                    <img src={this.state.article.author?.image} alt="img"></img>{" "}
                  </figure>
                  <div>
                    <div className="username">
                      {this.state.article.author?.username}
                    </div>
                    <div className="date">{this.state.article.createdAt}</div>
                  </div>
                </div>
              </div>
            </section>
            <section className="container">
              <p className="body">{this.state.article.body}</p>
              <hr />
              <p className="center">
                <NavLink className="links" to="/login">
                  Sign in
                </NavLink>{" "}
                or{" "}
                <NavLink className="links" to="/register">
                  Sign up
                </NavLink>{" "}
                to add comments on this article
              </p>
            </section>
          </>
        ) : (
          <p>loading article.....</p>
        )}
      </>
    );
  }
}

export default SingleArticle;
