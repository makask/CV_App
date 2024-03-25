import React, { useState } from "react";
import "./CVAboutMe.css";
import CVAboutMeForm from "./forms/CVAboutMeForm";

function CVAboutMe({cvId, aboutMe, getAboutMe}){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <CVAboutMeForm 
            toggleForm={toggleForm}
            cvId={cvId}
            aboutMe={aboutMe}
            getAboutMe={getAboutMe}
        /> : 
        <div className="about" onClick={toggleForm}>
            <p className="paragraph">
                {aboutMe[0].about_text}
            </p>
        </div>
    )
}

export default CVAboutMe;