import Navbar from "../Components/Navbar";
import Identity from "../Components/Identity";
import React from "react";

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