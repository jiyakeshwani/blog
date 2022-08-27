import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";
import Comment from "./Comment";

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      error: "",
      comment: null,
      commentBody: "",
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

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };
  deleteArticle = () => {
    let slug = this.props.match.params.slug;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json ",
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("not able to delete article");
      });
  };

  addComment = (event) => {
    event.preventDefault();
    let slug = this.props.match.params.slug;
    let { commentBody, article, comment } = this.state;
    // let body = commentBody.split(",").map((comment) => comment.trim());

    fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.props.user.token}`,
        },
        body: JSON.stringify({
          comment: {
            commentBody,
          },
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("can not create Comment");
        }
        return res.json();
      })
      .then(({ comment }) => {
        this.setState({
          commentBody: "",
          comment: commentBody.split(",").map((comment) => comment.trim()),
        });
      });
  };

  deleteComment = () => {
    this.setState({
      comment: "",
    });
  };
  render() {
    console.log(this.state.article);
    let slug = this.props.match.params.slug;
    return (
      <>
        {!this.state.article ? (
          <Loader />
        ) : (
          <>
            <section className="article-hero">
              <div className="container">
                <h4 className="h4">{this.state.article.title}</h4>
                <div className="flex">
                  <figure className="article-img">
                    <img src={this.state.article.author.image} alt="img"></img>{" "}
                  </figure>
                  <div>
                    <div className="username">
                      {this.state.article.author.username}
                    </div>
                    <div className="date">{this.state.article.createdAt}</div>
                  </div>
                </div>
                {this.props.user.username ===
                this.state.article.author.username ? (
                  <>
                    <button
                      onClick={() => {
                        this.props.history.push(`/editArticle/${slug}`);
                      }}
                      className="art-btn"
                    >
                      Edit Article
                    </button>
                    <button onClick={this.deleteArticle} className="art-btn2">
                      Delete Article
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </section>
            <section className="container">
              <p className="body">{this.state.article.body}</p>
              <hr />
              {this.props.user === null ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="box">
                    <div className="comment-box">
                      <textarea
                        value={this.state.commentBody}
                        name="commentBody"
                        onChange={this.handleChange}
                        rows="4"
                        placeholder="Write comment"
                      ></textarea>
                    </div>
                    <div className="comment-box2">
                      <button onClick={this.addComment}>Post Comment</button>
                    </div>

                    {this.state.comment ? (
                      <Comment
                        comment={this.state.comment}
                        commentBody={this.state.commentBody}
                        user={this.props.user}
                        deleteComment={this.deleteComment}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </>
    );
  }
}

export default withRouter(SingleArticle);
