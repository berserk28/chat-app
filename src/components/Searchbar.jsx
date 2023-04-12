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
  const [searchedUser, setSearchedUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false);
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

  const handleSearch = () => {
    const wanted = myUsers.filter((item) => {
      return userName === item.name;
    });
    if (wanted.length !== 0) {
      console.log(wanted);
    }
    if (userName === "") {
      setMyUsers(wanted);
    } else {
      setMyUsers([]);
    }
  };
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
        {myUsers.length !== 0 ? (
          myUsers.map((user) => {
            return <User user={user} key={user.uid} />;
          })
        ) : (
          <p>sorry there is no users</p>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
