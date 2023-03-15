import React from "react";
import Titlepage from "./Titlepage";
import LevelTag from "./LevelTag";
import MapPage from "./MapPage";
import ScorePage from "./ScorePage";
import Level1Quiz from "./Level1Quiz";
import Level2Page from "./Level_2/Level2Page";
import RegistrationPage from "./RegistrationPage";
import LevelBg from "./LevelBg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  var score = 3;
  var level = 1;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titlepage title="Money Mojo" />} />
        <Route path="/Level1Quiz" element={<Level1Quiz stage={0} />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/MapPage" element={<MapPage />} />
        <Route path="/ScorePage" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
