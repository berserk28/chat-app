import React, { useContext, useState } from "react";
import Img from "../images/img.png";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
const Input = () => {
  const { currentUser, selectedUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  console.log(image);
  const messageHandler = (e) => {
    console.log(e.value);
  };

  const handleSend = async () => {
    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        message: arrayUnion({
          id: uuid(),
          text: message,
          time: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.log("Error in sending the message");
    }
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Message ..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="send">
        <input
          type="file"
          id="img"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="img">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
