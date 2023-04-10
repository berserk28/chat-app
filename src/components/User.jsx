import React from "react";

const User = ({ user }) => {
  return (
    <div className="user">
      <img src={user.image} alt="" />

      <div className="user-info">
        <span> {user.name}</span>
        <p>hi , am back</p>
      </div>
    </div>
  );
};

export default User;
