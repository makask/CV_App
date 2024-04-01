import React, { useState, useEffect } from "react";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import WorkArea from "./WorkArea";

function Main({ userEmail, authToken, setIsCV, setCVid, profileData, getProfileData, setProfileData }){
   
    const[section, setSection] = useState("Home");
    const[cvs, setCvs] = useState([]);
    
    async function getUserCVs(userEmail){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs/${userEmail}`);
            const json = await response.json();
            setCvs(json);
        } catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(authToken){
           getUserCVs(userEmail);
           getProfileData(userEmail);
        }
    }, []);
  
    return(
        <div className="main-container">
                <LeftPanel setSection={setSection} section={section} getUserCVs={getUserCVs} />
                <div className="workarea">
                    { 
                        profileData?.map(item => <Header 
                        key={"0"} 
                        profileData={profileData} />)
                    }                 
                    <WorkArea 
                        section={section} 
                        cvs={cvs} 
                        setIsCV={setIsCV} 
                        setCVid={setCVid} 
                        profileData={profileData} 
                        setProfileData={setProfileData}
                        getProfileData={getProfileData}
                        getUserCVs={getUserCVs}
                        userEmail={userEmail}
                    />             
                </div>
        </div>
    );
}

export default Main;