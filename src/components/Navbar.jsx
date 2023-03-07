import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="title">Fast chat</span>
      <div className="user">
        <img
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt=""
        />
        <span className="user-name">saker toufik</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
