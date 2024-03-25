import React, { useState } from "react";
import './CVAboutMeTitle.css';
import CVAboutMeTitleForm from "./forms/CVAboutMeTitleForm";

function CVAboutMeTitle({cvId, aboutMeTitle, getAboutMeTitle}){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? 
        <CVAboutMeTitleForm 
            toggleForm={toggleForm}
            cvId={cvId}
            aboutMeTitle={aboutMeTitle}
            getAboutMeTitle={getAboutMeTitle}
        /> 
        :
        <div className="about-me-title">
            <h2 className="title2" onClick={toggleForm}>{aboutMeTitle[0].title}</h2>
        </div>
    );
}

export default CVAboutMeTitle;

