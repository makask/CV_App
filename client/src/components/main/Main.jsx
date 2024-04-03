import React, { useState, useEffect } from "react";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import WorkArea from "./WorkArea";

function Main({ userEmail, authToken, setIsCV, setCVid, profileData, getProfileData, setProfileData }){

    const[section, setSection] = useState("Home");
    const[cvs, setCvs] = useState([]);
    const[advertisements, setAdvertisements] = useState([]);
    const[tasks, setTasks] = useState([]);
    
    async function getUserCVs(userEmail){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs/${userEmail}`);
            const json = await response.json();
            setCvs(json);
        } catch(err){
            console.error(err);
        }
    }

    async function getUserAdvertisements(userEmail){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/advertisements/${userEmail}`);
            const json = await response.json();
            setAdvertisements(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getUserTasks(userEmail){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${userEmail}`);
            const json = await response.json();
            setTasks(json);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(authToken){
           getUserCVs(userEmail);
           getProfileData(userEmail);
           getUserAdvertisements(userEmail);
           getUserTasks(userEmail);
        }
    }, []);
    
    return(
        <div className="main-container">
                <LeftPanel 
                    setSection={setSection} 
                    section={section} 
                    getUserCVs={getUserCVs} 
                    getUserAdvertisements={getUserAdvertisements}
                    getUserTasks={getUserTasks}
                />
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
                        advertisements={advertisements}
                        getUserAdvertisements={getUserAdvertisements}
                        tasks={tasks}
                        getUserTasks={getUserTasks}
                    />             
                </div>
        </div>
    );
}

export default Main;