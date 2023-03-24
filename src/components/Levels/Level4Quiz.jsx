import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LevelBg from "../LevelBg";
import level4 from "../../level4";
import NextButton from "../NextButton";
import Coins from "../../assets/level4img/Coins.svg";
import ManStore from "../../assets/level4img/ManStore.svg";
import StoreSign from "../../assets/level4img/StoreSign.svg";
import { useAuthContext } from "../../firebase/useAuthContext";
import { ws } from "../../websocket";


function Level4Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const navigate = useNavigate();
  const [newPage, setNewPage] = useState(false);
  const [levelStart, setLevelStart] = useState(false);
  const { image, price, received } = level4[activeQuestion];
  const name = useAuthContext().user.email.split("@")[0];
  const { image, price, received, answer } = level4[activeQuestion];
  const isInitialMount = useRef(true);

  const onClickFirst = () => {
    setNewPage(true);
  };
  const onClickStart = () => {
    setLevelStart(true);
  };
  function onClickNext() {
    if (activeQuestion !== level4.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }
  function correct() {
    setResult((result) => result + 1);
    onClickNext();
  }
  async function statusCheck(){
    if(levelStart)
        {ws.send(JSON.stringify({type:"level",level:4,prompt: answer, coins:1,notes:2}));
        let promise= new Promise ((resolve, reject)=>{
          ws.onmessage=function(event){
            var message= JSON.parse(event.data);
            resolve(message);
          }
        })
        let response= await promise;
        console.log('response is '+ response);
        response?correct():onClickNext();
    }
  } 
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    statusCheck();
   }
  },[activeQuestion, levelStart])

  return (
    <div>
      {!levelStart ? (
        <div>
          {!newPage ? (
            <div className="lvl4-bg">
              <div className="body-container">
                <div className="level-title" style={{ top: "100px" }}>
                  Level 4
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
              <LevelBg bg="lvl4-bg" lvlnum="4" />
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
                  <br />
                  <br />
                  <p>
                    Please insert the correct amount of change into the
                    dino-bank!
                  </p>
                </div>
                <button className="btn-temp1" onClick={correct}>
                  Correct
                </button>
                <button className="btn-temp2">Wrong</button>
              </div>
              {/* <NextButton click={onClickNext} /> */}
            </div>
          ) : (
            navigate("/ScorePage", { state: { score: result, level: 4 } })
          )}
        </div>
      )}
    </div>
  );
}

export default Level4Quiz;
