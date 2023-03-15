import React, { useState } from "react";
import level1 from "../level1";
import { useNavigate } from "react-router-dom";
import LevelBg from "./LevelBg";
import Lvl1bg from "../assets/level1img/Lvl1bg.svg";
import NextButton from "./NextButton";

function Level1Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();

  const { question, choices, answer, image } = level1[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) => (selectedAnswer ? prev + 1 : prev));
    if (activeQuestion != level1.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };
  const onAnsSelected = (ans, index) => {
    setSelectedAnswerIndex(index);
    if (ans === answer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  
  return (
    <div>
      <LevelBg bg={Lvl1bg} lvlnum="1" />
      {!showResult ? (
        <div>
          <div className="body-container">
            <div className="body-text">{question}</div>

            <img
              className="coin-img"
              src={require("../assets/level1img/" + image + ".svg")}
              alt="coin image"
            />
            <div className="opt-container">
              {choices.map((ans, index) => (
                <button
                  onClick={() => onAnsSelected(ans, index)}
                  key={ans}
                  className={
                    selectedAnswerIndex === index
                      ? "option-btn selected-answer"
                      : "option-btn"
                  }
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
          <NextButton
            click={onClickNext}
            disabledFn={selectedAnswerIndex === null}
          />
        </div>
      ) : (
        navigate("/ScorePage", { state: { score: result, level: 1 } })
      )}
    </div>
  );
}

export default Level1Quiz;
