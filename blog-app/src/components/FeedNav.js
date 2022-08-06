import React from "react";
import { NavLink } from "react-router-dom";
function FeedNav(props) {
  return (
    <>
      <nav>
        <ul className="flex">
          <li>
            {" "}
            <NavLink className="nav-link" to="/">
              <span
                onClick={props.handleActiveTab}
                className={props.activeTab === "" ? "active-tab" : "feed-head"}
              >
                Global Feed
              </span>
            </NavLink>
          </li>

          {props.activeTab && (
            <li>
              {" "}
              <NavLink className="nav-link" to="/">
                <span className={props.activeTab ? "active-tab" : "feed-head"}>
                  #{props.activeTab}
                </span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default FeedNav;
