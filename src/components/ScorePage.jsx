import React, { useEffect } from "react";
import MapBackground from "../assets/scorepage/MapBackground.svg";
import ScoreBackground from "../assets/scorepage/ScoreBackground.svg";
import Stars from "./Stars";
import HomeBtn from "../assets/scorepage/HomeBtn.svg";
import ReplayBtn from "../assets/scorepage/ReplayBtn.svg";
import ContinueBtn from "../assets/scorepage/ContinueBtn.svg";
import { useAuthContext } from "../firebase/useAuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCollection } from "../firebase/useCollection";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { UserRecords } from "../firebase/UserRecordsObject";

function ScorePage() {
  const { user } = useAuthContext();
  const name = useAuthContext().user.email.split("@")[0];
  const { documents: users } = useCollection("users", ["uid", "==", name]);
  const score = useLocation()["state"].score;
  const level = useLocation()["state"].level;
  const navigate = useNavigate();

  function homeClick() {
    // try {
    //   console.log("working")
    //   updateData();
    // } catch (error) {
    //   console.error(error);
    // }
    navigate("/MapPage"); //map
  }
  function replayClick() {
    navigate("/Level" + level); //TODO
  }
  function nextClick() {
    if (level < 4) {
      var nextLvl = level + 1;
      navigate("/Level" + nextLvl); //TODO
    }
  }
  function saveScore() {
    //get user, update score and send to database
    console.log(user);
  }
  function processData() {
    //load user data
    var record = new UserRecords(users[0]);
    return record;
  }
  async function updateData() {
    console.log(name); //to access user's name
    //update user data
    console.log(user);
    console.log(users);
    var record = processData();
    console.log(record);
    //new update is score for round 5 being 5
    record.setScore(level - 1, score);
    const ref = doc(db, "users", "redesign");
    await updateDoc(ref, {
      score: record.score,
    });
    console.log("score is " + record.score);
    console.log(user);
    console.log("done!");
  }
  var starCount = [0, 0, 0];
  if (score == 5) {
    starCount = [1, 1, 1];
  } else if (score > 2) {
    starCount = [1, 1, 0];
  } else if (score > 0) {
    starCount = [1, 0, 0];
  }
  useEffect(() => {
    updateData();
  }, []);
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${MapBackground})` }}
    >
      <div className="center-container">
        <img className="score-bg" src={ScoreBackground} alt="ScoreBackground" />
        <Stars count={starCount} />

        <div className="level-title" style={{ top: "550px" }}>
          Level {level}
        </div>
        <div className="score">Score</div>
        <div className="score-num">{score}/5</div>
        <div className="success-msg">
          {score == 5 ? "Complete!" : "Try Again!"}
        </div>
        <div className="btn-container">
          <div className="btn-center">
            <button
              type="button"
              className="tag"
              onClick={homeClick}
              style={{
                backgroundImage: `url(${HomeBtn})`,
                height: "200px",
                width: "200px",
              }}
            />
          </div>
          <div className="btn-center">
            <button
              type="button"
              className="tag"
              onClick={replayClick}
              style={{
                backgroundImage: `url(${ReplayBtn})`,
                height: "200px",
                width: "200px",
              }}
            />
          </div>
          {score == 5 ? (
            <div className="btn-center">
              <button
                type="button"
                className="tag"
                onClick={nextClick}
                style={{
                  backgroundImage: `url(${ContinueBtn})`,
                  height: "200px",
                  width: "200px",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ScorePage;
