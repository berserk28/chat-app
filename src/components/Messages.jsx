import React from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
const Messages = () => {
  return (
    <div className="messages">
      <div className="message-info">
        <span>toufik</span>
        <CiCircleMore className="logo" />
      </div>
      <Message />
      <Message />
      <Message />
      <Input />
    </div>
  );
};

export default Messages;
