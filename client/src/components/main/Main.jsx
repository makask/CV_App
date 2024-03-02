import React, { useState, useEffect } from "react";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import WorkArea from "./WorkArea";

function Main({ userEmail, authToken, setIsCV, setCVid }){
   
    const[section, setSection] = useState("Home");
    const[cvs, setCvs] = useState(null);

    async function getUserCVs(){
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
            getUserCVs();
        }
    }, []);

    return(
        <div className="main-container">
                <LeftPanel setSection={setSection} />
                <div className="workarea">
                    <Header /> 
                    <WorkArea section={section} cvs={cvs} setIsCV={setIsCV} setCVid={setCVid} />             
                </div>
        </div>
    );
}

export default Main;