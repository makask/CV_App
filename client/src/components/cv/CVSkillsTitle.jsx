import React, {useState} from "react";
import CVSkillsTitleForm from "./forms/CVSkillsTitleForm";

function CVSkillsTitle({ cvId, skillsTitle, getSkillsTitle }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <CVSkillsTitleForm 
            toggleForm={toggleForm}
            cvId={cvId}
            skillsTitle={skillsTitle}
            getSkillsTitle={getSkillsTitle}    
            /> :
        <div className="about-me-title">
            <h2 onClick={toggleForm} className="title2">{skillsTitle[0].title}</h2>
        </div>
    )
}

export default CVSkillsTitle;

