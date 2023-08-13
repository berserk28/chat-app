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
  const [focused, setFocused] = useState(false);
  console.log(focused); // state for form focused input
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
      await uploadBytesResumable(imageRef, values.file).then(() => {
        getDownloadURL(imageRef).then(async (downloadURL) => {
          try {
            // updating the user
            await updateProfile(res.user, {
              displayName: values.displayName,
              photoURL: downloadURL,
            });
            // Add a new document in collection "users"

            await setDoc(doc(db, "users", res.user.uid), {
              name: values.displayName,
              email: values.email,
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
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">fast chat</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandler}>
          {inputs.map((element) => {
            // to display avatar input
            if (element.type === "file")
              return (
                <div>
                  <input
                    {...element}
                    name={element.name}
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    value={values[element.name]}
                    onChange={onChange}
                    required
                    onFocus={() => {
                      element.name === "confirmPassword" && setFocused(false);
                    }}
                  />
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
                </div>
              );
            // display our form inputs
            else
              return (
                <div className="input-container">
                  <input
                    {...element}
                    key={element.id}
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                    onChange={onChange}
                    value={values[element.name]}
                    required
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  />
                  <span>{element.errorMessage}</span>
                </div>
              );
          })}
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
