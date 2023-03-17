import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import level3 from "../../level3";
import NextButton from "../NextButton";

function Level3Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const { image, price, answer } = level3[activeQuestion];

  function onClickNext() {
    if (activeQuestion !== level3.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  }
  function correct() {
    setResult((result) => result + 1);
  }

  return (
    <div>
      <LevelBg bg="lvl3-bg" lvlnum="3" />
      {!showResult ? (
        <div>
          <div className="body-container">
            <div className="body-text" id="l3-body-text">
              Please insert the correct amount into the dino-bank:
            </div>
            <img
              className="l3-item-img"
              src={require("../../assets/level3img/" + image + ".svg")}
              alt="item"
            />
            <div className="body-text" id="l3-price">
              {price}
            </div>
            <button className="btn-temp1" onClick={correct}>
              Correct
            </button>
            <button className="btn-temp2">
              Wrong
            </button>
          </div>
          <NextButton click={onClickNext} />
        </div>
      ) : (
        navigate("/ScorePage", { state: { score: result, level: 3 } })
      )}
    </div>
  );
}

export default Level3Quiz;
