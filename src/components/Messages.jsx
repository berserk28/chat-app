import React, { useContext } from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Messages = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="messages">
      <div className="message-info">
        <span>{data.user.name}</span>
        <CiCircleMore className="logo" />
      </div>
      <div className="message-area">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <Input />
    </div>
  );
};

export default Messages;
