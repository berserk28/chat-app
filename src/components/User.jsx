import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const User = ({ user }) => {
  const { setSelectedUser, currentUser } = useContext(AuthContext);
  const handleSelect = async () => {
    const combinedID =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;
    console.log(combinedID);
    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      //  if chats collection does not exist create one
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID));
      }
    } catch (error) {
      console.log("chats ERROR");
    }
  };
  return (
    <div className="user" onClick={handleSelect}>
      <img src={user.image} alt="" />

      <div className="user-info">
        <span> {user.name}</span>
        <p>hi , am back</p>
      </div>
    </div>
  );
};

export default User;
