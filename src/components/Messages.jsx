import React from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
import Input from "./Input";
const Messages = () => {
  return (
    <div className="messages">
      <div className="message-info">
        <span>toufik</span>
        <CiCircleMore className="logo" />
      </div>
      <div className="message-area">
        <Message />
        <Message />
        <Message />
      </div>
      <Input />
    </div>
  );
};

export default Messages;
