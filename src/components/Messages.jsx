import React, { useContext, useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import Message from "./Message";
import Input from "./Input";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  doc,
  onSnapshot,
  collection,
  querySnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { getDatabase, ref, onValue } from "firebase/database";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  console.log();
  const documentId = "qJoQx6lVKQb5V59hkbUdT02dy952CQlP7hy1qIgE7FNvhRNvUX3KBd82";
  const userId = "qJoQx6lVKQb5V59hkbUdT02dy952";
  console.log(data.chatId);
  const docRef = doc(db, "chats", data.chatId);

  useEffect(() => {
    const docSnap = getDoc(docRef).then((res) => {
      const items = res.data().message.map((msg) => {
        return msg;
      });

      setMessages([...items]);
      console.log(messages);
      // const userMessages = res
      //   .data()
      //   .message.filter((msg) => msg.senderId === userId);
      // setMessages([...userMessages]);
      // console.log({
      //   userMessages,
      // });
    });
  }, [data.chatId]);

  return (
    <div className="messages">
      <div className="message-info">
        <span>{data.user.name}</span>
        <CiCircleMore className="logo" />
      </div>
      <div className="message-area">
        {messages &&
          messages.map((msg) => {
            return <Message key={msg.id} msg={msg} />;
          })}
      </div>
      <Input />
    </div>
  );
};

export default Messages;
