import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].value.replace("C:\\fakepath\\", "");
    console.log(avatar);
    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      // creating unique image
      const storageRef = ref(storage, avatar);
      const uploadTask = uploadBytesResumable(
        storageRef,
        "Directory/$filename"
      );

      uploadTask.on(
        (error) => {
          console.log("nooo");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL, name);
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            // Add a new document in collection "users"
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      console.log("nonooo");
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
