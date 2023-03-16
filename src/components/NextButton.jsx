import React from "react";

function NextButton(props) {
  return (
    <button
      className="tag next-btn"
      type="button"
      onClick={props.click}
      style={{  left: "75%", bottom: "3%" }}
      disabled={props.disabledFn}
    ></button>
  );
}

export default NextButton;

