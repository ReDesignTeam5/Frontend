import React, { useEffect, useState } from "react";
import level4 from "../../level4";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import Twodollartag from "../../assets/level4img/2dollartag.svg";
import Fivedollartag from "../../assets/level4img/5dollartag.svg";
import Tendollartag from "../../assets/level4img/10dollartag.svg";
import Fiftydollartag from "../../assets/level4img/50dollartag.svg";
import Hundreddollartag from "../../assets/level4img/100dollartag.svg";
import NextButton from "../NextButton";
import Congrats from "../Congrats";
import { useAuthContext } from "../../firebase/useAuthContext";
import { ws } from "../../websocket";
import ButtonClick from "../../assets/Sounds/clickbutton.mp3";
import CorrectSound from "../../assets/Sounds/correct.mp3";
import WrongSound from "../../assets/Sounds/wrong.mp3";

function Level4Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState({ sr: false, cg: false });
  const [result, setResult] = useState(0);
  const [levelStart, setLevelStart] = useState(false);
  const navigate = useNavigate();
  const name = useAuthContext().user.email.split("@")[0];

  const { choices, answer, image } = level4[activeQuestion];

  const onClickStart = () => {
    new Audio(ButtonClick).play();
    setLevelStart(true);
  };
  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    ws.send(
      JSON.stringify({ type: "level", level: 1, status: selectedAnswer })
    );
    setResult((prev) => (selectedAnswer ? prev + 1 : prev));
    if (activeQuestion !== level4.length - 1) {
      setShowResult({ sr: false, cg: true });
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult({ sr: true, cg: true });
    }
    if (selectedAnswer) {
      new Audio(CorrectSound).play();
    } else {
      new Audio(WrongSound).play();
    }
    new Audio(ButtonClick).play();
  };
  const onAnsSelected = (ans, index) => {
    setSelectedAnswerIndex(index);
    if (ans === answer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  useEffect(() => {
    if (showResult.sr === true && showResult.cg === false) {
      navigate("/ScorePage", { state: { score: result, level: 4 } });
    }
  }, [showResult]);

  const handleClose = () => {
    setShowResult({ ...showResult, cg: false });
  };

  return (
    <div>
      {!levelStart ? (
        <div>
          <LevelBg bg="lvl4-bg" lvlnum="4" />
          <div className="body-container">
            <div
              className="body-text"
              style={{ fontSize: "55px", width: "60%" }}
            >
              Hello, {name}! <p>Help me recognise these notes:</p>
            </div>
            <div className="tag-container">
              <img className="coin-tag" src={Twodollartag} alt="$2 note" />
              <img className="coin-tag" src={Fivedollartag} alt="$5 note" />
              <img className="coin-tag" src={Tendollartag} alt="$10 note" />
              <img className="coin-tag" src={Fiftydollartag} alt="$50 note" />
              <img
                className="coin-tag"
                src={Hundreddollartag}
                alt="$100 note"
              />
            </div>
          </div>
          <NextButton click={onClickStart} />
        </div>
      ) : (
        <div>
          <LevelBg bg="lvl4-bg" lvlnum="4" />
          <div>
            <div className="body-container">
              <div className="body-text">What note is this?</div>

              <img
                className="coin-img"
                src={require("../../assets/level4img/" + image + ".svg")}
                alt="note"
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
                <Congrats
                  open={showResult.cg}
                  handleClose={handleClose}
                  correct={selectedAnswer}
                />
              </div>
            </div>
            <NextButton
              click={onClickNext}
              disabledFn={selectedAnswerIndex === null}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Level4Quiz;
