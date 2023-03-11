import React from "react";
import Img from "../images/img.png";
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Message ..." />
      <div className="send">
        <input type="file" id="img" style={{ display: "none" }} />
        <label htmlFor="img">
          <img src={Img} alt="" />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Input;
