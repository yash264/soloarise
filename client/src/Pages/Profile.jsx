import Navbar from "../Components/Navbar";
import Identity from "../Components/Identity";
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
    return (
        <>
            <div className="profile-screen">
                <Navbar />
                <Identity />
            </div>
        </>
    )
}

export default Profile;