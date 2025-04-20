import React , { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home";
import FrontPage from './Pages/FrontPage';
import Auth from './Pages/Auth';

import LevelTree from './Components/LevelTree';
import Quests from './Pages/Quests';
import Ranking from './Pages/Ranking';
import Profile from './Pages/Profile';

import ProtectedRoute from './Components/ProtectedRoute';
import RedirectIfAuthenticated from './Components/RedirectIfAuthenticated';
import { UserProvider } from './Context/UserContext';
function App() {

  axios.defaults.withCredentials = true;

  const startServer = async () => {
    try {
      const response = await axios.get('https://soloariseserver.onrender.com/startServer');

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    startServer();
  }, [])

  return (
    <>
     <UserProvider>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/dungeon" element={
          <RedirectIfAuthenticated><Auth /></RedirectIfAuthenticated>
         } />

        <Route path="/hunter" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/hunter/ascension" element={<ProtectedRoute element={<LevelTree />} />} />
        <Route path="/quests" element={<ProtectedRoute element={<Quests />} />} />
        <Route path="/ranking" element={<ProtectedRoute element={<Ranking />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;
