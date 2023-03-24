import React from "react";
import Titlepage from "./Titlepage";
import MapPage from "./MapPage";
import ScorePage from "./ScorePage";
import Level1Quiz from "./Levels/Level1Quiz";
import Level2Quiz from "./Levels/Level2Quiz";
import Level3Quiz from "./Levels/Level3Quiz";
import Level4Quiz from "./Levels/Level4Quiz";
import RegistrationPage from "./RegistrationPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  var score = 3;
  var level = 1;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Titlepage title="Money Mojo" />} />
        <Route path="/Level1" element={<Level1Quiz />} />
        <Route path="/Level2" element={<Level2Quiz />} />
        <Route path="/Level3" element={<Level3Quiz />} />
        <Route path="/Level4" element={<Level4Quiz/>} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/MapPage" element={<MapPage />} />
        <Route path="/ScorePage" element={<ScorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
