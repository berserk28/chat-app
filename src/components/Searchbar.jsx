import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
const Searchbar = () => {
  const [userName, setUserName] = useState();
  const handleSearch = async () => {
    // Create a reference to the cities collection

    const usersRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersRef, where("name", "==", userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  };
  const handleKey = (e) => {
    e.key === "Enter" && handleSearch();
  };
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Find a user "
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={handleKey}
      />
    </div>
  );
};

export default Searchbar;
