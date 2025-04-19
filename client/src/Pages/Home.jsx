import React from "react";
import Navbar from "../Components/Navbar";
import Section from "../Components/Section";
import DailyTask from "../Components/DailyTask";

const Home = () => {
    return (
        <div className="home-screen">
           <Navbar />
           <Section />
           <DailyTask />
        </div>
    )
}

export default Home;