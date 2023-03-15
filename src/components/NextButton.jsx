import React from "react";
import NextBtn from "../assets/NextBtn.svg";
function NextButton(props) {
  return (
    <button
      className="tag next-btn"
      type="button"
      onClick={props.click}
      style={{ backgroundImage: `url(${NextBtn})`, left: "75%", bottom: "3%" }}
      disabled = {props.disabledFn}
    ></button>
  );
}

export default NextButton;
