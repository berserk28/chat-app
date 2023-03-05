import React from "react";
import avatar from "../images/avatar.jpg";
const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            placeholder="none"
            id="file"
          />
          <label htmlFor="file">
            <img src={avatar} alt="avatar" />
            <span> + add an avatar </span>
          </label>
          <button> Sign in </button>
          <p>you do have an accont ? login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
