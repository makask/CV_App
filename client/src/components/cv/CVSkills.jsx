import React, { useState } from "react";
import "./CVSkills.css";
import CVSkillsForm from "./forms/CVSkillsForm";

function CVSkills({cvId, skills, getSkills}){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <CVSkillsForm 
            cvId={cvId}
            skills={skills}
            getSkills={getSkills}
            toggleForm={toggleForm}
        /> :
        <div className="about" onClick={toggleForm}>
                <h4 id="skills">{skills[0].skills}</h4>                                           
        </div> 
    )
}

export default CVSkills;

