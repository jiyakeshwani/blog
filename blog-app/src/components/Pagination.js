import React from "react";

class Pagination extends React.Component {
  render() {
    let { articleCount, articlesPerPage } = this.props;
    let noOfPages = Math.ceil(articleCount / articlesPerPage);
    console.log(noOfPages);
    let pageArray = [];
    for (let i = 1; i <= noOfPages; i++) {
      pageArray.push(i);
    }
    return (
      <>
        <div className=" container flex wrap">
          <div className="count">
            {pageArray.map((page) => {
              console.log(page);
              return (
                <button
                  onClick={() => this.props.handleActivePage(page)}
                  className={
                    this.props.activePage === page
                      ? "active-count"
                      : "count-btn"
                  }
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Pagination;
