import React from "react";
import Tag from "../assets/Leveltag.svg";
import Lock from "../assets/Lockedtag.svg"

function LevelTag(props) {
  function levelClick() {
    alert("Level " + props.number);
  }
  return (
    <button
      className="tag"
      type="button"
      onClick={levelClick}
      disabled={props.score>5}
      style={{
        backgroundImage: props.score>5?`url(${Lock})`:`url(${Tag})`,
        left: props.left,
        top: props.top,
      }}
    >
      <h1 className="number">{props.number}</h1>
    </button>
  );
}

export default LevelTag;
