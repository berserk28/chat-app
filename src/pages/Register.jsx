import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import nani from "../images/nani.gif";
const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

      setLoading(true);
      // creating unique image
      const imageRef = ref(storage, `${displayName}`);
      await uploadBytesResumable(imageRef, file).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          try {
            // updating the user
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Add a new document in collection "users"

            await setDoc(doc(db, "users", res.user.uid), {
              name: displayName,
              email: email,
              image: downloadURL,
              uid: res.user.uid,
            });
            // create empty user chat on firestore
            await setDoc(doc(db, "usersChats", res.user.uid), {});
            navigate("/");
            setLoading(false);
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
            {!loading && <img src={avatar} alt="avatar" />}
            {loading ? (
              <span>
                <img src={nani} alt="" className="spinner" />
                Uploading and compressing the image please wait
              </span>
            ) : (
              <span>+ Add an avatar</span>
            )}
          </label>
          <button> Sign in</button>
          <p>
            You do have an account?<Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
