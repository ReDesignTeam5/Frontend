import React from "react";
import LevelBg from "./LevelBg";
import NextButton from "./NextButton";
import Coins from "../assets/level4img/Coins.svg";
import ManStore from "../assets/level4img/ManStore.svg";
import StoreSign from "../assets/level4img/StoreSign.svg";

function Level4start() {
  return (
    //page 1
    // <div className="lvl4-bg">
    //   <div className="body-container">
    //     <div className="level-title" style={{ top: "100px" }}>
    //       Level 4
    //     </div>
    //     <div
    //       style={{
    //         width: "100vw",
    //         backgroundColor: "#826850",
    //         position: "absolute",
    //         height: "30%",
    //         bottom: "0%",
    //       }}
    //     ></div>
    //     <img
    //       style={{ width: "90%", top: "20%", position: "absolute" }}
    //       src={StoreSign}
    //       alt="Store Sign"
    //     />
    //     <img
    //       style={{ width: "90%", top: "30%", position: "absolute" }}
    //       src={ManStore}
    //       alt="Man at store"
    //     />
    //   </div>
    //   <NextButton />
    // </div>

    //page 2

    <div>
      <LevelBg bg="lvl4-bg" lvlnum="4" />
      <div className="body-container">
        <div
          className="body-text"
          style={{ fontSize: "55px", width: "65%", top: "25%" }}
        >
          Hi (name)! I have taken on a new job as a cashier. Help me return the
          correct amount of change to customers!
        </div>
        <img
          className="dino-bank-img"
          style={{ width: "400px", top: "55%", position: "absolute" }}
          src={Coins}
          alt="Coins"
        />
      </div>
      <NextButton />
    </div>
  );
}

export default Level4start;
