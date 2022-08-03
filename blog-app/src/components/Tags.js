import React from "react";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }
  componentDidMount() {
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/tags`)
      .then((res) => res.json())
      .then((tags) =>
        this.setState({
          tags: tags.tags,
        })
      );
  }
  render() {
    console.log(this.state.tags);
    return (
      <aside className="tag-wrapper">
        <h3>Popular Tags</h3>
        <div className="flex wrap">
          {this.state.tags.map((tag) => {
            return <div className="tg"> {tag}</div>;
          })}
        </div>
      </aside>
    );
  }
}

export default Tags;
