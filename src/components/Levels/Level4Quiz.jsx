import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import level4 from "../../level4";
import NextButton from "../NextButton";

function Level4Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const { image, price, received } = level4[activeQuestion];

  function onClickNext() {
    if (activeQuestion !== level4.length - 1) {
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
      <LevelBg bg="lvl4-bg" lvlnum="4" />
      {!showResult ? (
        <div>
          <div className="body-container">
            <div className="body-text">
              <strong>Item sold:</strong>
            </div>
            <img
              className="l4-item-img"
              src={require("../../assets/level4img/" + image + ".svg")}
              alt="item"
            />
            <img
              className="l4-tag-img"
              src={require("../../assets/level4img/" + price + ".svg")}
              alt="price tag"
            />
            <div className="body-text" id="paid-text">
              <strong>Customer paid: </strong>
              <u>{received}</u>
              <br/><br/>
              <p>
                Please insert the correct amount of change into the dino-bank!
              </p>
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
        navigate("/ScorePage", { state: { score: result, level: 4 } })
      )}
    </div>
  );
}

export default Level4Quiz;
