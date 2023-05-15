import React, { useContext } from "react";
import Img from "../images/img.png";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Input = () => {
  const { currentUser, selectedUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messageHandler = (e) => {
    console.log(e.value);
  };

  const handleSend = () => {
    console.log(data);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Message ..."
        onChange={(e) => console.log(e.target.value)}
      />
      <div className="send">
        <input type="file" id="img" style={{ display: "none" }} />
        <label htmlFor="img">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
