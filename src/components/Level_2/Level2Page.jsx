import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Level2Page(props) {
    const navigate = useNavigate();
    const [stage, setNewStage]= useState(props.stage)
    const [score, setNewScore]= useState(0)
  const content=["5c","10c","20c","50c","$1"]

  function incrementStage(){
    setNewStage(stage=>stage+1)
  }
  function correct(){
    setNewScore(score=>score+1)
    incrementStage()
  }
  function renderScore(){
    navigate("/ScorePage", {state:{score: score, level:2}});
  }

  return (
    <div
      className="background_level_2"
    >
      <h1 className="title">{props.title} </h1>
      <h1> {content[stage]}</h1>
      {stage!=5 ?(
        <div>
      <button onClick={correct}>
        Correct
      </button>
      <button onClick={incrementStage}>
        Wrong
      </button>
      </div>)
      :
       (<button onClick={renderScore}>Continue</button>)
       }
    </div>
  );
}

export default Level2Page;
