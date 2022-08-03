import React from "react";
import GlobalFeed from "./GlobalFeed";
import Header from "./Header";
import Hero from "./Hero";
import Tags from "./Tags";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Hero />
        <div className="container  flex ">
          <div className="feed">
            {" "}
            <GlobalFeed />
          </div>
          <div className="tag-section">
            {" "}
            <Tags />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
