import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import Dinobank from "../../assets/level2img/Dinobank.svg";
import NextButton from "../NextButton";
import { useAuthContext } from "../../firebase/useAuthContext";
import { ws } from "../../websocket";
import Congrats from "../Congrats";

function Level5Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState({ sr: false, cg: false });
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const [levelStart, setLevelStart] = useState(false);
  const level5 = ["$2", "$5", "$10", "$2", "$5"];
  const name = useAuthContext().user.email.split("@")[0];
  const prompt = [2, 5, 10, 2, 5];
  const isInitialMount = useRef(true);
  const [anscorrect, setAnsCorrect] = useState(false);

  const onClickStart = () => {
    setLevelStart(true);
  };
  function onClickNext() {
    if (activeQuestion !== level5.length - 1) {
      setShowResult({ sr: false, cg: true });
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult({ sr: true, cg: true });
    }
  }
  async function statusCheck() {
    if (levelStart) {
      ws.send(
        JSON.stringify({
          type: "level",
          level: 5,
          prompt: prompt[activeQuestion],
          coins: 2,
          notes: 0,
        })
      );
      let promise = new Promise((resolve, reject) => {
        ws.onmessage = function (event) {
          var message = JSON.parse(event.data);
          resolve(message);
        };
      });
      let response = await promise;
      console.log("response is " + response);
      response ? correct() : onClickNext();
    }
  }
  useEffect(() => {
    if (showResult.sr === true && showResult.cg === false) {
      navigate("/ScorePage", { state: { score: result, level: 5 } });
    }
  }, [showResult]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      statusCheck();
    }
  }, [activeQuestion, levelStart]); //cannot await setState- useEffect to watch it

  function correct() {
    setResult((result) => result + 1);
    setAnsCorrect(true);
    onClickNext();
  }
  const handleClose = () => {
    setShowResult({ ...showResult, cg: false });
  };
  return (
    <div>
      {!levelStart ? (
        <div>
          <LevelBg bg="lvl5-bg" lvlnum="5" />
          <div className="body-container">
            <div
              className="body-text"
              style={{ fontSize: "50px", width: "65%", top: "25%" }}
            >
              Great job in recognising the different notes {name}! Now, we need
              to insert the correct notes into the dino-bank!
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
          <LevelBg bg="lvl5-bg" lvlnum="5" />

          <div className="body-container">
            <div className="body-text">
              Insert a <p id="l2-value">{level5[activeQuestion]}</p>note into
              the dino-bank!
            </div>
            <img className="dino-bank-img" src={Dinobank} alt="Dino-bank" />
          </div>
          <Congrats
            open={showResult.cg}
            handleClose={handleClose}
            correct={anscorrect}
          />
        </div>
      )}
    </div>
  );
}

export default Level5Quiz;
