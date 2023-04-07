import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import User from "./User";
const Searchbar = () => {
  const [userName, setUserName] = useState();
  const handleSearch = async () => {
    // Create a reference to the users collection

    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("name", "==", userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().name);
    });
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
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};

export default Searchbar;
