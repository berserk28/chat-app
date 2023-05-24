import React, { useContext, useState } from "react";
import Face from "../images/face.jpg";
import { AuthContext } from "../context/AuthContext";
const Message = ({ msg }) => {
  const { currentUser } = useContext(AuthContext);
  const { senderId, text } = msg;
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  if (senderId === currentUser.uid) {
    setIsCurrentUser(true);
  } else {
    setIsCurrentUser(false);
  }
  return (
    <div className="message ">
      <div
        className={isCurrentUser ? "message-content owner" : "message-content "}
      >
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
          <p>{text} </p>
          {/* <img src={Face} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Message;
