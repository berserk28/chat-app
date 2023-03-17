import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Register = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].value;
    console.log(avatar);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("wrong");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandler}>
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
