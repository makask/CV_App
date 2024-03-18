import React from "react";
import CVProfile from "./CVProfile";
import CVContact from "./CVContact";

function CV({ profileData, getProfileData, setProfileData, setIsCv,  setCVid, id }){

    function handleClick(){
        setIsCv(false);
        setCVid(null);
    }

    return (
        <div className="cv">
                <button onClick={handleClick}>Go Back {id}</button>
            <div className="cv-container">
                <div className="left-panel">
                    <CVProfile profileData={profileData} getProfileData={getProfileData} setProfileData={setProfileData}/>
                    <CVContact />
                </div>
                <div className="right-panel"></div>
            </div>
        </div>
    );
}

export default CV;