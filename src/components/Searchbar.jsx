import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import User from "./User";
const Searchbar = () => {
  const [userName, setUserName] = useState();
  const [myUsers, setMyUsers] = useState([]);

  const collectionRef = collection(db, "users");

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
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
        {myUsers.length !== 0 ? (
          myUsers.map((user) => {
            return <User user={user} key={user.uid} />;
          })
        ) : (
          <p>sorry there is no such user</p>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
