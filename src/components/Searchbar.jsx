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
  const [isLoading, setIsLoading] = useState(false);
  const collectionRef = collection(db, "users");
  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMyUsers(items);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleSearch = async () => {};
  const handleKey = (e) => {
    e.key === "Enter" && handleSearch();
  };
  return (
    <div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Find a user "
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      <div className="users">
        {myUsers.map((user) => {
          console.log(user.uid);
          return <User user={user} key={user.uid} />;
        })}
      </div>
    </div>
  );
};

export default Searchbar;
