import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import Dinobank from "../../assets/level2img/Dinobank.svg";
import NextButton from "../NextButton";

function Level2Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const [levelStart, setLevelStart] = useState(false);
  const level2 = ["5¢", "10¢", "20¢", "50¢", "$1"];

  const onClickStart = () => {
    setLevelStart(true);
  };
  function onClickNext() {
    if (activeQuestion !== level2.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  }
  function correct() {
    setResult((result) => result + 1);
    onClickNext();
  }

  return (
    <div>
      {!levelStart ? (
        <div>
          <LevelBg bg="lvl2-bg" lvlnum="2" />
          <div className="body-container">
            <div
              className="body-text"
              style={{ fontSize: "50px", width: "65%", top: "25%" }}
            >
              Great job in recognising the different coins (name)! Now, we need
              to insert the correct coins into the dino-bank!
            </div>
            <img
              className="dino-bank-img"
              style={{ width: "500px", top: "50%" }}
              src={Dinobank}
              alt="Dino-bank"
            />
          </div>
          <NextButton click={onClickStart} />
        </div>
      ) : (
        <div>
          <LevelBg bg="lvl2-bg" lvlnum="2" />
          {!showResult ? (
            <div className="body-container">
              <div className="body-text">
                Insert a <p id="l2-value">{level2[activeQuestion]}</p>coin into
                the dino-bank!
              </div>
              <img className="dino-bank-img" src={Dinobank} alt="Dino-bank" />
              <button className="btn-temp1" onClick={correct}>
                Correct
              </button>
              <button className="btn-temp2" onClick={onClickNext}>
                Wrong
              </button>
            </div>
          ) : (
            navigate("/ScorePage", { state: { score: result, level: 2 } })
          )}
        </div>
      )}
    </div>
  );
}

export default Level2Quiz;
