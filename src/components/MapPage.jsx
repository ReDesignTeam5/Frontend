import React, { useRef, useEffect } from "react";
import Map from "../assets/mappage/Map.svg";
import LevelTag from "./LevelTag";
import { useAuthContext } from "../firebase/useAuthContext";
import { useDocument } from "../firebase/useDocument";
import StandardBgm from "../assets/Sounds/standardbgm.mp3";

function MapPage() {
  let bgm = useRef();
  const name = useAuthContext().user.email.split("@")[0];
  //console.log(name) //to access user's name
  const { document: result } = useDocument("users", name);

  useEffect(() => {
    bgm.current = new Audio(StandardBgm);
    bgm.current.play();
    bgm.current.loop = true;
  }, []);

  useEffect(() => {
    return () => {
      bgm.current.pause();
    }
  }, []);

  return (
    <div className="background" style={{ backgroundImage: `url(${Map})` }}>
      {result && (
        <div>
          <LevelTag
            number="1"
            left="45%"
            top="80%"
            score={result.score[0]}
            locked={false}
          />
          <LevelTag
            number="2"
            left="10%"
            top="60%"
            score={result.score[1]}
            locked={result.score[0] == 5 ? false : true}
          />
          <LevelTag
            number="3"
            left="45%"
            top="50%"
            score={result.score[2]}
            locked={result.score[1] == 5 ? false : true}
          />
          <LevelTag
            number="4"
            left="75%"
            top="30%"
            score={result.score[3]}
            locked={result.score[2] == 5 ? false : true}
          />
          <LevelTag
            number="5"
            left="45%"
            top="18%"
            score={result.score[4]}
            locked={result.score[3] == 5 ? false : true}
          />
          <LevelTag
            number="6"
            left="8%"
            top="7%"
            score={result.score[5]}
            locked={result.score[4] == 5 ? false : true}
          />
        </div>
      )}
      <div className="maplabel">Map</div>
    </div>
  );
}

export default MapPage;
