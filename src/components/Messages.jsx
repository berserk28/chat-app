import React, { useContext, useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot, collection, querySnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
  const [messages, setMessagesss] = useState([]);
  const { data } = useContext(ChatContext);
  const collectionRef = collection(db, "chats");
  useEffect(() => {
    let items = [];
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      querySnapshot.forEach((item) => {
        items.push(item.data());
      });
    });
    setMessagesss(items);
    return () => {
      unsub();
    };
  }, []);
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
