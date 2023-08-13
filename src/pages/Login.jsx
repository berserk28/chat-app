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
          {error ? (
            <div class="error-container">
              <h1 class="error-heading">User Not Found</h1>
              <p class="error-description">
                The user you are looking for does not exist.
              </p>
              <Link to={"/register"} class="error-link">
                Go back to the Register page
              </Link>
            </div>
          ) : (
            <div>
              <button> Sign in </button>
              <p>
                You don't have an account?{" "}
                <Link to={"/register"}>Register</Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
