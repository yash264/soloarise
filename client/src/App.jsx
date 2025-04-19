import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FrontPage from './Pages/FrontPage';
import Auth from './Pages/Auth';

import LevelTree from './Components/LevelTree';
import Quests from './Pages/Quests';
import Ranking from './Pages/Ranking';
import Profile from './Pages/Profile';

import ProtectedRoute from './Components/ProtectedRoute';
import RedirectIfAuthenticated from './Components/RedirectIfAuthenticated';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <RedirectIfAuthenticated><FrontPage /></RedirectIfAuthenticated>} />
        <Route path="/dungeon" element={
          <RedirectIfAuthenticated><Auth /></RedirectIfAuthenticated>
         } />

        <Route path="/hunter" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/hunter/ascension" element={<ProtectedRoute element={<LevelTree />} />} />
        <Route path="/quests" element={<ProtectedRoute element={<Quests />} />} />
        <Route path="/ranking" element={<ProtectedRoute element={<Ranking />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </>
  );
}

export default App;
