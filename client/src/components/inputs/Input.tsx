import React from "react";
import "./topContainer.css";
import { BiSearchAlt } from "react-icons/bi";

const Input = () => {
  return (
    <div className="cont">
      <div className="topContainer">
        <div className="inputBox">
          <input type="text" placeholder="Search for platform" />
          <i>
            <BiSearchAlt />
          </i>
        </div>
      </div>
    </div>
  );
};
export default Input;
