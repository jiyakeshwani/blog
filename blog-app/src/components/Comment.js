import React from "react";

function Comment(props) {
  return (
    <>
      {props.comment.map((com) => {
        return (
          <div className="comment">
            <p>{com}</p>
          </div>
        );
      })}

      <div className="comment-info flex space-between">
        <div className="user">
          <span className="user-name">{props.user.username}</span>
        </div>
        <div>
          <button onClick={props.deleteComment} className="delete">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Comment;
