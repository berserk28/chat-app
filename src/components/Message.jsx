import React, { useContext, useState, useEffect } from "react";
import Face from "../images/face.jpg";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const Message = ({ msg }) => {
  const { currentUser } = useContext(AuthContext);
  const { senderId, text } = msg;
  const [profileImage, setProfileImage] = useState();
  // const [isCurrentUser, setIsCurrentUser] = useState(false);
  const isCurrentUser = senderId === currentUser.uid;
  const docRef = doc(db, "users", msg.senderId);
  useEffect(() => {
    const image = getDoc(docRef).then((res) => {
      setProfileImage(res.data().image);
    });
  }, []);

  console.log(profileImage);
  return (
    <div className="message ">
      <div
        className={isCurrentUser ? "message-content owner" : "message-content "}
      >
        <div className="message-icon-time">
          <img src={profileImage} alt="foto" />
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
