import React from "react";
import Tag from "../assets/mappage/Leveltag.svg";
import Lock from "../assets/mappage/Lockedtag.svg";
import { useNavigate } from "react-router-dom";

function LevelTag(props) {
  const navigate = useNavigate();

  function levelClick() {
    // console.log("Level "+props.number +" Score: "+props.score)
    navigate("/Level" + props.number);
  }

  return (
    <button
      className="tag"
      type="button"
      onClick={levelClick}
      disabled={props.locked}
      style={{
        backgroundImage: props.locked ? `url(${Lock})` : `url(${Tag})`,
        left: props.left,
        top: props.top,
      }}
    >
      {props.locked ? null : <h1 className="number">{props.number}</h1>}
    </button>
  );
}

export default LevelTag;
