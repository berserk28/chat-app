import React, { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import {
  ref,
  // 
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";

import avatar from "../images/avatar.jpg";
const Register = () => {
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  });

  const inputs = [
    {
      id: 1,
      name: "displayName",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: `^[A-Za-z0-9]{3,16}$`,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 5,
      name: "file",
      type: "file",
      label: { avatar },
    },
  ];

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // creating account
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      setLoading(true);
      // creating unique image
      const imageRef = ref(storage, `${values.displayName}`);
      const metadata = {
        contentType: "image/jpeg",
      };
      //  uploading image

      uploadBytes(imageRef, newFileName).then((snapshot) => {
        console.log("Uploaded a blob or file! " + snapshot);
      });
    } catch (error) {
      console.log("u did not authentificate ur accont");
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  let newFileName =
    "C:/Users/Origin/Downloads/charles-gaudreault-xXofYCc3hqc-unsplash.jpg";
  console.log(newFileName);
  console.log(values.file);
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandler}>
          <div className="input-container">
            {inputs.map((input) => {
              const { name } = input;

              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values.name}
                  onChange={onChange}
                  loading={loading}
                />
              );
            })}
          </div>
          <button> Sign in</button>
          <p>
            You do have an account? <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

//  await uploadBytesResumable(imageRef, `${newFileName}`, metadata).then(() => {
//    getDownloadURL(imageRef).then(async (downloadURL) => {
//      console.log(downloadURL);
//      try {
//        // updating the user
//        await updateProfile(res.user, {
//          displayName: values.displayName,
//          photoURL: downloadURL,
//        });
//        // Add a new document in collection "users"

//        await setDoc(doc(db, "users", res.user.uid), {
//          name: values.displayName,
//          email: values.email,
//          image: downloadURL,
//          uid: res.user.uid,
//        });
//        // create empty user chat on firestore
//        await setDoc(doc(db, "usersChats", res.user.uid), {});
//        navigate("/");
//        setLoading(false);
//      } catch (error) {
//        console.log("error image problem");
//      }
//    });
//  });
