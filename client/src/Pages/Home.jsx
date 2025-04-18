import React from "react";
import Navbar from "../Components/Navbar";
import Alert from "../Components/Alert";
import Section from "../Components/Section";
import DailyTask from "../Components/DailyTask";

const Home = () => {
    return (
        <>
           <Navbar />
           <Alert />
           <Section />
           <DailyTask />
        </>
    )
}

export default Home;