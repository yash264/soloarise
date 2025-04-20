import React from "react";
import Navbar from "../Components/Navbar";
import Section from "../Components/Section";
import DailyTask from "../Components/DailyTask";
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {
    const [quest, setQuest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchQuest = async () => {
            try {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("https://soloariseserver.onrender.com/api/quest", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setQuest(response.data.quest);
            } catch (err) {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    setQuest(null);
                } else {
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchQuest();
    }, []);


    return (
        <div className="home-screen">
           <Navbar />
           <Section />
           <DailyTask quest = {quest} />
        </div>
    )
}

export default Home;