import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [setError, error] = useState(false);
  const [setLoading, loading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      // creating account
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      // creating unique image
      const imageRef = ref(storage, `${displayName}`);
      await uploadBytesResumable(imageRef, file).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          try {
            // updating the user
            await (res.user,
            {
              displayName,
              photoURL: downloadURL,
            });
            // Add a new document in collection "users"

            await setDoc(doc(db, "users", res.user.uid), {
              name: displayName,
              email: email,
              image: downloadURL,
            });
            // create empty user chat on firestore
            await setDoc(doc(db, "usersChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.log("error image problem");
          }
        });
      });
    } catch (error) {
      console.log("big error");
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
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={avatar} alt="avatar" />
            <span> + add an avatar </span>
          </label>
          <button> Sign in </button>
          <p>
            You do have an account?<Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
