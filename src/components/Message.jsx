import React from "react";

const Message = () => {
  return (
    <div className="message">
      <div className="message-content">
        <img
          src={
            "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          }
          alt="foto"
        />
        <p>hey how u doing </p>
      </div>
      <span>just now</span>
    </div>
  );
};

export default Message;
