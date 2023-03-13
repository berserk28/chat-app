import React from "react";
import Face from "../images/face.jpg";
const Message = () => {
  return (
    <div className="message ">
      <div className="message-content owner">
        <div className="message-icon-time">
          <img
            src={
              "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            }
            alt="foto"
          />
          <span>just now</span>
        </div>

        <div className="message-content-container">
          <p>hey how u doing </p>
          {/* <img src={Face} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Message;
