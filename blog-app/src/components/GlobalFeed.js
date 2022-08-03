import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import LoadingSpinner from "./Loader";

class GlobalFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articleCount: 0,
    };
  }
  componentDidMount() {
    fetch(` https://mighty-oasis-08080.herokuapp.com/api/articles`)
      .then((res) => res.json())
      .then((articles) =>
        this.setState({
          articles: articles.articles,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="feed">
        <div>
          <span className="feed-head">Global Feed</span>
          <hr></hr>
        </div>
        {!this.state.articles ? (
          <Loader />
        ) : (
          <ul className="articles">
            {this.state.articles.map((article) => {
              return (
                <li className="article" key={article.slug}>
                  <div className="flex">
                    <figure className="article-img">
                      {" "}
                      <img src={article.author.image} alt="img"></img>{" "}
                    </figure>
                    <div>
                      <div className="username">{article.author.username}</div>
                      <div className="date">{article.createdAt}</div>
                    </div>
                  </div>
                  <h2 className="title">{article.title}</h2>
                  <p className="description">{article.description}</p>
                  <div className="flex space-between more">
                    <NavLink
                      className="navlink"
                      to={`/articles/${article.slug}`}
                    >
                      <span className="more-btn">Read More...</span>
                    </NavLink>
                    <div className="tags flex">
                      {article.tagList.map((tag) => {
                        return (
                          <NavLink
                            className="navlink"
                            to={`/articles/${article.slug}`}
                          >
                            <div className="tag">{tag}</div>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default GlobalFeed;