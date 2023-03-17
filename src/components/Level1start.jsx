import React from "react";
import LevelBg from "./LevelBg";
import Fivecenttag from "../assets/level1img/5cent.svg";
import Tencentag from "../assets/level1img/10cent.svg";
import Twentycentag from "../assets/level1img/20cent.svg";
import Fiftycentag from "../assets/level1img/50cent.svg";
import Onedollartag from "../assets/level1img/1dollar.svg";
import NextButton from "./NextButton";

function Level1start() {
  return (
    <div>
      <LevelBg bg="lvl1-bg" lvlnum="1" />
      <div className="body-container">
        <div className="body-text" style={{ fontSize: "55px", width: "60%" }}>
          Hello, (name)! <p>Help me recognise these coins:</p>
        </div>
        <div className="tag-container">
          <img className="coin-tag" src={Fivecenttag} alt="5 cent coin" />
          <img className="coin-tag" src={Tencentag} alt="10 cent coin" />
          <img className="coin-tag" src={Twentycentag} alt="20 cent coin" />
          <img className="coin-tag" src={Fiftycentag} alt="50 cent coin" />
          <img className="coin-tag" src={Onedollartag} alt="1 dollar coin" />
        </div>
      </div>
      <NextButton />
    </div>
  );
}

export default Level1start;
