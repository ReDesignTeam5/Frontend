import React from "react";
import StarFilled from "../assets/scorepage/StarFilled.svg";
import StarEmpty from "../assets/scorepage/StarEmpty.svg";

function Stars(props) {
  const StarElement=props.count.map((value, idx)=>
    <img key= {idx} className="star" src={value==1?StarFilled:StarEmpty} alt="Star1" />
  );
  return (
    <div className="star-container">
      {StarElement}
    </div>
  );
}

export default Stars;
