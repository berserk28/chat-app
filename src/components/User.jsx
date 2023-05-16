import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
const User = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleSelect = async () => {
    // calling dispatch function
    dispatch({ type: "Change_user", payload: user });
    const combinedID =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;
    console.log(combinedID);
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      //  if chats collection does not exist create one
      console.log(user.name);
      if (!res.exists()) {
        // creating chat collection
        await setDoc(doc(db, "chats", combinedID), { message: {} });

        // create user
        await updateDoc(doc(db, "usersChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.name,
            photoURL: user.image,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        // current user
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedID + ".currentUserInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.name,
            photoURL: currentUser.image,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        console.log("first");
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
