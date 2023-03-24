import React, { useEffect, useState } from "react";
import Background from "../assets/Background.svg";
import { useNavigate } from "react-router-dom";
import {ws} from "../websocket";

function Titlepage(props) {
  const [hardwareConnection, setHardwareConnection]=useState(false);

  ws.onopen=(event)=>{
    console.log('WebSocket connection established.');
  }
  ws.onclose=()=>{
    console.log('WebSocket connection closed.');
  }

  useEffect(()=>{
    statusCheck(); //check when loggin in
  },[]);
  
  async function statusCheck(){
    ws.send(JSON.stringify({type:"check"})); //check for hardware connection
    let promise= new Promise ((resolve, reject)=>{
      ws.onmessage=function(event){
        var message= JSON.parse(event.data);
        resolve(message);
      }
    })
    let response= await promise;
    setHardwareConnection(response);
  }

  const navigate = useNavigate();

  async function handleClick() {
    await statusCheck();
    !hardwareConnection? alert("no hardware connected"): navigate("/RegistrationPage"); 
  }
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="center-container">
        <h1 className="title">{props.title} </h1>
        <button
          className="startbutton bg-[#ABE6EA]"
          type="button"
          onClick={handleClick}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
}

export default Titlepage;
