import React from "react";
import BrownBox from "../assets/BrownBox.svg";
import Boy from "../assets/Boy.svg";

function LevelBg(props) {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${props.bg})`,
      }}
    >
      <div className="center-container">
        <img className="score-bg" src={BrownBox} alt="Brown Box" />
        <img
          style={{
            position: "absolute",
            height: "300px",
            left: "3%",
            bottom: "2%",
          }}
          src={Boy}
          alt="Boy image"
        />
        <div className="level-title" style={{ top: "100px" }}>{"Level "+ props.lvlnum}</div>
      </div>
    </div>
  );
}

export default LevelBg;
