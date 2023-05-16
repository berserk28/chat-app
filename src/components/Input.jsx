import React, { useContext, useState } from "react";
import Img from "../images/img.png";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const Input = () => {
  const { currentUser, selectedUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const messageHandler = (e) => {
    console.log(e.value);
  };

  const handleSend = async () => {
    if (image) {
      const imageRef = ref(storage, uuid());
      await uploadBytesResumable(imageRef, image).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", data.chatId), {
              message: arrayUnion({
                id: uuid(),
                image: downloadURL,
                time: Timestamp.now(),
              }),
            });
          } catch (error) {
            console.log("Error in sending the message");
          }
        });
      });
    } else {
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
    }
    setMessage("");
    setImage(null);
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
          onChange={(e) => setImage(e.target.files[0])}
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
