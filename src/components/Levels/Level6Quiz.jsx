import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import level6 from "../../level6";
import NextButton from "../NextButton";
import Coins from "../../assets/level6img/Coins.svg";
import ManStore from "../../assets/level6img/ManStore.svg";
import StoreSign from "../../assets/level6img/StoreSign.svg";
import { useAuthContext } from "../../firebase/useAuthContext";
import { ws } from "../../websocket";
import Congrats from "../Congrats";

function Level6Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState({ sr: false, cg: false });
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const [newPage, setNewPage] = useState(false);
  const [levelStart, setLevelStart] = useState(false);
  const { image, price, received, answer } = level6[activeQuestion];
  const name = useAuthContext().user.email.split("@")[0];
  const isInitialMount = useRef(true);
  const [anscorrect, setAnsCorrect] = useState(false);

  const onClickFirst = () => {
    setNewPage(true);
  };
  const onClickStart = () => {
    setLevelStart(true);
  };
  function onClickNext() {
    if (activeQuestion !== level6.length - 1) {
      setShowResult({ sr: false, cg: true });
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult({ sr: true, cg: true });
    }
  }
  function correct() {
    setResult((result) => result + 1);
    setAnsCorrect(true);
    onClickNext();
  }
  async function statusCheck() {
    if (levelStart) {
      ws.send(
        JSON.stringify({
          type: "level",
          level: 6,
          prompt: answer,
          coins: 1,
          notes: 1,
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
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      statusCheck();
    }
  }, [activeQuestion, levelStart]);

  useEffect(() => {
    if (showResult.sr === true && showResult.cg === false) {
      navigate("/ScorePage", { state: { score: result, level: 6 } });
    }
  }, [showResult]);
  const handleClose = () => {
    setShowResult({...showResult,cg:false});
  };
  return (
    <div>
      {!levelStart ? (
        <div>
          {!newPage ? (
            <div className="lvl6-bg">
              <div className="body-container">
                <div className="level-title" style={{ top: "100px" }}>
                  Level 6
                </div>
                <div
                  style={{
                    width: "100vw",
                    backgroundColor: "#826850",
                    position: "absolute",
                    height: "30%",
                    bottom: "0%",
                  }}
                ></div>
                <img
                  style={{ width: "90%", top: "20%", position: "absolute" }}
                  src={StoreSign}
                  alt="Store Sign"
                />
                <img
                  style={{ width: "90%", top: "30%", position: "absolute" }}
                  src={ManStore}
                  alt="Man at store"
                />
              </div>
              <NextButton click={onClickFirst} />
            </div>
          ) : (
            <div>
              <LevelBg bg="lvl6-bg" lvlnum="6" />
              <div className="body-container">
                <div
                  className="body-text"
                  style={{ fontSize: "55px", width: "65%", top: "25%" }}
                >
                  Hi {name}! I have taken on a new job as a cashier. Help me
                  return the correct amount of change to customers!
                </div>
                <img
                  className="dino-bank-img"
                  style={{ width: "400px", top: "55%", position: "absolute" }}
                  src={Coins}
                  alt="Coins"
                />
              </div>
              <NextButton click={onClickStart} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <LevelBg bg="lvl6-bg" lvlnum="6" />
          <div className="body-container">
            <div className="body-text">
              <strong>Item sold:</strong>
            </div>
            <img
              className="l6-item-img"
              src={require("../../assets/level6img/" + image + ".svg")}
              alt="item"
            />
            <img
              className="l6-tag-img"
              src={require("../../assets/level6img/" + price + ".svg")}
              alt="price tag"
            />
            <div className="body-text" id="paid-text">
              <strong>Customer paid: </strong>
              <u>{received}</u>
              <br />
              <br />
              <p>
                Please insert the correct amount of change into the dino-bank!
              </p>
            </div>
            <Congrats
              open={showResult.cg}
              handleClose={handleClose}
              correct={anscorrect}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Level6Quiz;
