import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import { useLocation } from "react-router-dom";

function Quests() {
    const { state } = useLocation();
    const exercise = state?.exercise;

    return (
        <>
            <div className="quest-screen">
                <Navbar />
                <Banner exercise = {exercise}/>
            </div>
        </>
    )
}

export default Quests;