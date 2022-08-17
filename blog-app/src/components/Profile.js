import React from "react";
import Posts from "./Posts";

class Profile extends React.Component {
  state = {
    activeTab: "author",
    articles: [],
  };
  fetchData = () => {
    fetch(
      ` https://mighty-oasis-08080.herokuapp.com/api/articles` +
        `/?${this.state.activeTab}=${this.props.user.username}`
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((articles) =>
        this.setState({
          articles: articles.articles,
        })
      )
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.fetchData();
  }
  handleActiveTab = (tab) => {
    this.setState({ activeTab: tab }, () => this.fetchData());
  };
  render() {
    let { activeTab } = this.state;
    let { user } = this.props;
    return (
      <>
        <div className="hero-profile">
          <figure>
            <img
              src={
                user.imageUrl ||
                "https://www.kindpng.com/picc/m/355-3551848_black-smiley-face-png-transparent-png-png-download.png"
              }
            />
          </figure>
          <h5>{user.username}</h5>
          <button className="follow">+Follow {user.username} </button>
        </div>
        <div className="container articles">
          <div className="nav flex">
            <button
              className={
                activeTab === "author" ? "active-articles" : "articles-button"
              }
              onClick={() => this.handleActiveTab("author")}
            >
              My articles
            </button>
            <button
              className={
                activeTab === "favorited"
                  ? "active-articles"
                  : "articles-button"
              }
              onClick={() => this.handleActiveTab("favorited")}
            >
              Favorited articles
            </button>
          </div>
          <hr />
          <Posts articles={this.state.articles} />
        </div>
      </>
    );
  }
}

export default Profile;
