import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FrontPage from './Pages/FrontPage';
import Auth from './Pages/Auth';

import LevelTree from './Components/LevelTree';

import Quests from './Pages/Quests';
import Ranking from './Pages/Ranking';
import Profile from './Pages/Profile';

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/dungeon" element={<Auth />}></Route>
        <Route path="/hunter" element={<Home />}></Route>
        <Route path="/hunter/ascension" element={<LevelTree />}></Route>

        <Route path="/quests" element={<Quests />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>

    </>
  );
}

export default App;
