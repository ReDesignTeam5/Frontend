import React from "react";
import Map from "../assets/mappage/Map.svg";
import LevelTag from "./LevelTag";
import { useAuthContext } from "../firebase/useAuthContext";
import { useDocument } from "../firebase/useDocument";

function MapPage() {
  const name = useAuthContext().user.email.split("@")[0];
  //console.log(name) //to access user's name
  const { document: result } = useDocument("users", name);

  return (
    <div className="background" style={{ backgroundImage: `url(${Map})` }}>
      {result && (
        <div>
          <LevelTag
            number="1"
            left="45%"
            top="73%"
            score={result.score[0]}
            locked={false}
          />
          <LevelTag
            number="2"
            left="13%"
            top="60%"
            score={result.score[1]}
            locked={result.score[0] == 5 ? false : true}
          />
          <LevelTag
            number="3"
            left="75%"
            top="30%"
            score={result.score[2]}
            locked={result.score[1] == 5 ? false : true}
          />
          <LevelTag
            number="4"
            left="13%"
            top="10%"
            score={result.score[3]}
            locked={result.score[2] == 5 ? false : true}
          />
        </div>
      )}
      <div className="maplabel">Map</div>
    </div>
  );
}

// function MapPage() {

//   return (
//     <div className="background" style={{ backgroundImage: `url(${Map})` }}>

//       <div>
//       <LevelTag number="1" left="45%" top="73%" />
//       <LevelTag number="2" left="13%" top="60%" />
//       <LevelTag number="3" left="75%" top="30%" />
//       <LevelTag number="4" left="13%" top="10%" />
//       </div>

//       <div className="maplabel">Map</div>

//     </div>

//   );
// }

export default MapPage;
