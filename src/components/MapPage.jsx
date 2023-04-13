import React, { useRef, useEffect } from "react";
import Map from "../assets/mappage/Map.svg";
import LevelTag from "./LevelTag";
import { useAuthContext } from "../firebase/useAuthContext";
import { useDocument } from "../firebase/useDocument";
import StandardBgm from "../assets/Sounds/standardbgm.mp3";

function MapPage() {
  let bgm = useRef();
  //const name = useAuthContext().user.email.split("@")[0];
  //console.log(name) //to access user's name
  // const { document: result } = useDocument("users", name);

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
            score="5"
            locked={false}
          />
          <LevelTag
            number="2"
            left="10%"
            top="60%"
            score="5"
            locked={false}
          />
          <LevelTag
            number="3"
            left="45%"
            top="50%"
            score="5"
            locked={false}
          />
          <LevelTag
            number="4"
            left="75%"
            top="30%"
            score="5"
            locked={false}
          />
          <LevelTag
            number="5"
            left="45%"
            top="18%"
            score="5"
            locked={false}
          />
          <LevelTag
            number="6"
            left="8%"
            top="7%"
            score="5"
            locked={false}
          />
        </div>
      )}
      <div className="maplabel">Map</div>
    </div>
  );
}

export default MapPage;
