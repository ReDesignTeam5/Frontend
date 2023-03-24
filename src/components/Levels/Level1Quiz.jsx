import React, { useState } from "react";
import level1 from "../../level1";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import Fivecenttag from "../../assets/level1img/5cent.svg";
import Tencentag from "../../assets/level1img/10cent.svg";
import Twentycentag from "../../assets/level1img/20cent.svg";
import Fiftycentag from "../../assets/level1img/50cent.svg";
import Onedollartag from "../../assets/level1img/1dollar.svg";
import NextButton from "../NextButton";
import { useAuthContext } from "../../firebase/useAuthContext";

function Level1Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const [levelStart, setLevelStart] = useState(false);
  const navigate = useNavigate();
  const name = useAuthContext().user.email.split("@")[0];

  const { question, choices, answer, image } = level1[activeQuestion];

  const onClickStart = () => {
    setLevelStart(true);
  };
  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) => (selectedAnswer ? prev + 1 : prev));
    if (activeQuestion !== level1.length - 1) {
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
      {!levelStart ? (
        <div>
          <LevelBg bg="lvl1-bg" lvlnum="1" />
          <div className="body-container">
            <div
              className="body-text"
              style={{ fontSize: "55px", width: "60%" }}
            >
              Hello, {name}! <p>Help me recognise these coins:</p>
            </div>
            <div className="tag-container">
              <img className="coin-tag" src={Fivecenttag} alt="5 cent coin" />
              <img className="coin-tag" src={Tencentag} alt="10 cent coin" />
              <img className="coin-tag" src={Twentycentag} alt="20 cent coin" />
              <img className="coin-tag" src={Fiftycentag} alt="50 cent coin" />
              <img
                className="coin-tag"
                src={Onedollartag}
                alt="1 dollar coin"
              />
            </div>
          </div>
          <NextButton click={onClickStart} />
        </div>
      ) : (
        <div>
          <LevelBg bg="lvl1-bg" lvlnum="1" />
          {!showResult ? (
            <div>
              <div className="body-container">
                <div className="body-text">{question}</div>

                <img
                  className="coin-img"
                  src={require("../../assets/level1img/" + image + ".svg")}
                  alt="coin"
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
      )}
    </div>
  );
}

export default Level1Quiz;
