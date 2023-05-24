import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import User from "./User";
import { AuthContext } from "../context/AuthContext";
import { getDatabase, ref, child, get } from "firebase/database";
import { ChatContext } from "../context/ChatContext";
const Searchbar = () => {
  const [userName, setUserName] = useState();
  const [myUsers, setMyUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [chats, setChats] = useState();

  const collectionRef = collection(db, "users");
  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      items = items.filter((item) => {
        return currentUser.displayName !== item.name;
      });
      if (userName) {
        const wanted = items.filter((item) => {
          return userName === item.name;
        });
        setMyUsers(wanted);
      } else {
        setMyUsers(items);
      }
    });

    return () => {
      unsub();
    };
  }, [userName]);

  return (
    <div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Find a user "
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="users">
        {" "}
        {myUsers.length !== 0 ? (
          myUsers.map((user) => {
            return <User user={user} key={user.uid} />;
          })
        ) : (
          <p> there are no users</p>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
