import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const User = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const handleSelect = () => {
    console.log(user.uid);
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
