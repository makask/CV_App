import React, { useState } from "react";
import CVWorkExperienceTitleForm from "./forms/CVWorkExperienceTitleForm";


function CVWorkExperienceTitle({ cvId, workExperienceTitle, getWorkExperienceTitle }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <CVWorkExperienceTitleForm 
            cvId={cvId}
            workExperienceTitle={workExperienceTitle}
            getWorkExperienceTitle={getWorkExperienceTitle}
            toggleForm={toggleForm}
        /> :
        <div className="about-me-title">
            <h2 className="title2" onClick={toggleForm}>{workExperienceTitle[0].title}</h2>
        </div>
    )
}

export default CVWorkExperienceTitle;

