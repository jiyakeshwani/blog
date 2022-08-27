import React from "react";
import FeedNav from "./FeedNav";
import GlobalFeed from "./GlobalFeed";
import Header from "./Header";
import Hero from "./Hero";
import Pagination from "./Pagination";
import Tags from "./Tags";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articleCount: 0,
      error: "",
      articlesPerPage: 10,
      activePage: 1,
      activeTab: "",
    };
  }

  handleActiveTab = () => {
    this.setState({ activeTab: "" });
  };

  addTab = (value) => {
    this.setState({
      activeTab: value,
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }
  fetchData = () => {
    const offset = (this.state.activePage - 1) * this.state.articlesPerPage;
    let tag = this.state.activeTab;
    fetch(
      ` https://mighty-oasis-08080.herokuapp.com/api/articles` +
        `/?offset=${offset}&limit=${this.state.articlesPerPage}` +
        (tag && `&tag=${tag}`)
    )
      .then((res) => res.json())
      .then((articles) =>
        this.setState({
          articles: articles.articles,
          error: "",
          articleCount: articles.articlesCount,
        })
      )
      .catch((err) => console.log(err));
  };
  handleActivePage = (i) => {
    this.setState(
      {
        activePage: i,
      },
      this.fetchData()
    );
  };
  render() {
    return (
      <div>
        <Hero />
        <div className="container  flex ">
          <div className="feed">
            <FeedNav
              activeTab={this.state.activeTab}
              handleActiveTab={this.handleActiveTab}
            />
            <GlobalFeed
              articles={this.state.articles}
              articleCount={this.state.articleCount}
              error={this.state.error}
              user={this.props.user}
            />
            <Pagination
              articlesPerPage={this.state.articlesPerPage}
              articleCount={this.state.articleCount}
              activePage={this.state.activePage}
              handleActivePage={this.handleActivePage}
            />
          </div>
          <div className="tag-section">
            {" "}
            <Tags addTab={this.addTab} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
