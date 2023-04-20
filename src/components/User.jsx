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
        // creating chat collection
        await setDoc(doc(db, "chats", combinedID), { message: {} });

        // create user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        // current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".currentUserInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
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
