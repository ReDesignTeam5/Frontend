import React from "react";
import LevelBg from "./LevelBg";
import NextButton from "./NextButton";
import VendingMachine from "../assets/level3img/VendingMachine.svg";
import PlasticBag from "../assets/level3img/PlasticBag.svg";
import Boy from "../assets/Boy.svg";

function Level3start() {
  return (
    //page 1
    // <div className="lvl3-bg">
    //   <div className="body-container">
    //     <div className="level-title" style={{ top: "100px" }}>
    //       Level 3
    //     </div>
    //     <div
    //       style={{
    //         width: "100vw",
    //         backgroundColor: "#BEB5B5",
    //         position: "absolute",
    //         height: "30%",
    //         bottom: "0%",
    //       }}
    //     ></div>{" "}
    //     <img
    //       style={{ width: "90%", top: "20%", position: "absolute" }}
    //       src={VendingMachine}
    //       alt="Vending Machine"
    //     />
    //   </div>
    //   <img
    //     style={{
    //       position: "absolute",
    //       height: "300px",
    //       left: "3%",
    //       bottom: "2%",
    //     }}
    //     src={Boy}
    //     alt="Boy"
    //   />
    //   <NextButton />
    // </div>
      
      
    //page 2

    <div>
      <LevelBg bg="lvl3-bg" lvlnum="3" />
      <div className="body-container">
        <div
          className="body-text"
          style={{ fontSize: "60px", width: "65%", top: "25%" }}
        >
          Hi (name)! I need your help to buy some food from the vending machine!
        </div>
        <img
          style={{ width: "500px", top: "50%", position:"absolute" }}
          src={PlasticBag}
          alt="Plastic Bag"
        />
      </div>
      <NextButton />
    </div>
  );
}

export default Level3start;
