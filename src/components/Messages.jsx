import React, { useContext, useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessages] = useState();
  const { data } = useContext(ChatContext);
  console.log(data);
  useEffect(() => {
    // fteching all message between current user and  selected user
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      setMessages(Object.entries(doc.data())[0][1]);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);
  console.log(messages);
  return (
    <div className="messages">
      <div className="message-info">
        <span>{data.user.name}</span>
        <CiCircleMore className="logo" />
      </div>
      <div className="message-area">
        {messages &&
          messages.map((msg) => {
            return <Message msg={msg} />;
          })}
      </div>
      <Input />
    </div>
  );
};

export default Messages;
