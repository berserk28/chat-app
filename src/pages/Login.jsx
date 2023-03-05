import React from "react";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button> Sign in </button>
          <p>you do have an accont ? login</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
