import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [error, setError] = useState(false);
  const [setLoading, loading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      navigate("/");
      setError(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Login</span>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button> Sign in </button>
          <p>
            You don't have an account? <Link to={"/register"}>Register</Link>
          </p>
          {error && <p>something went wrong</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
