import React from "react";
import Background from "../assets/Background.svg";
import { useNavigate } from "react-router-dom";

function Titlepage(props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/RegistrationPage");
  }
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
     
      <h1 className="title">{props.title} </h1>
      <button className="startbutton bg-[#ABE6EA]" type="button" onClick={handleClick}>
        Let's Go
      </button>
    </div>
  );
}

export default Titlepage;
