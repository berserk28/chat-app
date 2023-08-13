import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
const User = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [lastMessage, setLastMessage] = useState();
  // get data of last message
  const docRef = doc(db, "userChats", "date");

  const combinedID =
    user.uid > currentUser.uid
      ? user.uid + currentUser.uid
      : currentUser.uid + user.uid;
  useEffect(() => {
    // getiing the last message and put in
    const unsub = onSnapshot(doc(db, "usersChats", user.uid), (doc) => {
      setLastMessage(
        Object.entries(doc.data())[0][1].currentUserInfo.lastMessage
      );
    });

    return () => {
      unsub();
    };
  }, []);

  const handleSelect = async () => {
    // calling dispatch function
    dispatch({ type: "Change_user", payload: user });

    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      //  if chats collection does not exist create one
      console.log(user.name);
      if (!res.exists()) {
        // creating chat collection
        await setDoc(doc(db, "chats", combinedID), { message: {} });

        // updating userchats of the selected user
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
  console.log(lastMessage);
  return (
    <div className="user" onClick={handleSelect}>
      <img src={user.image} alt="" />

      <div className="user-info">
        <span> {user.name}</span>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default User;
