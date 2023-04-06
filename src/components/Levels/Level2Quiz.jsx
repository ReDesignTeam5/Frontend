import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import Dinobank from "../../assets/level2img/Dinobank.svg";
import NextButton from "../NextButton";
import { useAuthContext } from "../../firebase/useAuthContext";
import { ws } from "../../websocket";
import Congrats from "../Congrats";
import ButtonClick from "../../assets/Sounds/clickbutton.mp3";
import CorrectSound from "../../assets/Sounds/correct.mp3";
import WrongSound from "../../assets/Sounds/wrong.mp3";

function Level2Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState({
    sr: false,
    cg: false,
    cr: false,
  });
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const [levelStart, setLevelStart] = useState(false);
  const level2 = ["5¢", "10¢", "20¢", "50¢", "$1"];
  const name = useAuthContext().user.email.split("@")[0];
  const prompt = [0.05, 0.1, 0.2, 0.5, 1];
  const isInitialMount = useRef(true);

  const onClickStart = () => {
    setLevelStart(true);
    new Audio(ButtonClick).play();
  };
  function wrong() {
    if (activeQuestion !== level2.length - 1) {
      setShowResult({ sr: false, cg: true, cr: false });
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult({ sr: true, cg: true, cr: false });
    }
    new Audio(WrongSound).play();
  }
  function correct() {
    setResult((result) => result + 1);
    if (activeQuestion !== level2.length - 1) {
      setShowResult({ sr: false, cg: true, cr: true });
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult({ sr: true, cg: true, cr: true });
    }
    new Audio(CorrectSound).play();
  }
  async function statusCheck() {
    if (levelStart) {
      ws.send(
        JSON.stringify({
          type: "level",
          level: 2,
          prompt: prompt[activeQuestion],
          coins: 0,
          notes: 2,
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
      response ? correct() : wrong();
    }
  }
  useEffect(() => {
    if (showResult.sr === true && showResult.cg === false) {
      navigate("/ScorePage", { state: { score: result, level: 2 } });
    }
  }, [showResult]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      statusCheck();
    }
  }, [activeQuestion, levelStart]); //cannot await setState- useEffect to watch it

  const handleClose = () => {
    setShowResult({ ...showResult, cg: false, cr: false });
  };

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
              Great job in recognising the different coins {name}! Now, we need
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

          <div className="body-container">
            <div className="body-text">
              Insert a <p id="l2-value">{level2[activeQuestion]}</p>coin into
              the dino-bank!
            </div>
            <img className="dino-bank-img" src={Dinobank} alt="Dino-bank" />
          </div>
          <Congrats
            open={showResult.cg}
            handleClose={handleClose}
            correct={showResult.cr}
          />
        </div>
      )}
    </div>
  );
}

export default Level2Quiz;
