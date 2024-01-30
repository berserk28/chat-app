import React, { useState } from "react";
import nani from "../images/nani.gif";
import avatar from "../images/avatar.jpg";
const FormInput = (props) => {
  const {
    name,
    type,
    errorMessage,
    placeholder,
    onChange,
    loading,

    ...inputProps
  } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  // to display avatar input
  if (name === "file")
    return (
      <div>
        <input
          {...inputProps}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="file"
          name={name}
          onChange={onChange}
        />

        <label htmlFor="file">
          {!loading && <img src={avatar} alt="avatar" />}
          {loading ? (
            <span>
              <img src={nani} alt="" className="spinner" />
              Uploading and compressing the image please wait
            </span>
          ) : (
            <p>+ Add an avatar</p>
          )}
        </label>
      </div>
    );
  // to display other input
  else
    return (
      <div>
        <label>{placeholder}</label>
        <input
          {...inputProps}
          placeholder={placeholder}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
      </div>
    );
};

export default FormInput;

// to display avatar input
//   if (element.type === "file")
//     return (
//       <div>
//         <input
//           {...element}
//           name={element.name}
//           style={{ display: "none" }}
//           type="file"
//           id="file"
//           value={values[element.name]}
//           onChange={onChange}
//           required
//           onFocus={() => {
//             element.name === "confirmPassword" && setFocused(false);
//           }}
//         />
//         <label htmlFor="file">
//           {!loading && <img src={avatar} alt="avatar" />}
//           {loading ? (
//             <span>
//               <img src={nani} alt="" className="spinner" />
//               Uploading and compressing the image please wait
//             </span>
//           ) : (
//             <span>+ Add an avatar</span>
//           )}
//         </label>
//       </div>
//     );
//   // display our form inputs
//   else
//     return (
//       <div className="input-container">
//         <input
//           {...element}
//           key={element.id}
//           name={element.name}
//           type={element.type}
//           placeholder={element.placeholder}
//           onChange={onChange}
//           value={values[element.name]}
//           required
//           onBlur={handleFocus}
//           focused={focused.toString()}
//         />
//         <span>{element.errorMessage}</span>
//       </div>
