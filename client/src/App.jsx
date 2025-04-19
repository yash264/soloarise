import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FrontPage from './Pages/FrontPage';
import Auth from './Pages/Auth';
import LevelTree from './Components/LevelTree';

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/dungeon" element={<Auth />}></Route>
        <Route path="/hunter" element={<Home />}></Route>
        <Route path="/hunter/ascension" element={<LevelTree />}></Route>
      </Routes>

    </>
  );
}

export default App;
