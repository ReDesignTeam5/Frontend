import React from "react";
import LevelBg from "./LevelBg";
import NextButton from "./NextButton";
import Dinobank from "../assets/level2img/Dinobank.svg";

function Level2start() {
  return (
    <div>
      <LevelBg bg="lvl2-bg" lvlnum="2" />
      <div className="body-container">
        <div
          className="body-text"
          style={{ fontSize: "50px", width: "65%", top: "25%" }}
        >
          Great job in recognising the different coins (name)! Now, we need to
          insert the correct coins into the dino-bank!
        </div>
        <img
          className="dino-bank-img"
          style={{ width: "500px", top: "50%" }}
          src={Dinobank}
          alt="Dino-bank"
        />
      </div>
      <NextButton />
    </div>
  );
}

export default Level2start;
