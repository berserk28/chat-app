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
      navigate("/");
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
          <div className="input-container">
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
          </div>

          {error ? (
            <div class="error-container">
              <p class="error-description">
                Wrong password or email. Try again or click Register to create
                new accont.
              </p>
              <div>
                <button> Sign in </button>
                <p>
                  You don't have an account?{" "}
                  <Link to={"/register"}>Register</Link>
                </p>
              </div>
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
