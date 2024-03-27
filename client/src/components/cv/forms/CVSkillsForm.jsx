import React, { useState } from "react";
import "./CVSkillsForm.css";

function CVSkillsForm({cvId, skills, getSkills, toggleForm }){

    const[skillsString, setSkillsString] = useState(skills[0].skills);

    function handleChange(event){
        setSkillsString(event.target.value);
    }

    async function editSkills(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/skills/${cvId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    skills: skillsString
                }) 
            });
            getSkills(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="about">
           <div className="skills-form-container">
                <div className="skills-form-input">
                    <h4 id="skills"><input id="skills-form-input" type="text" value={skillsString} onChange={handleChange}></input></h4>
                </div>
                <div className="skills-form-buttons">
                    <i className="fullName-edit fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editSkills}></i>
                    <h4 className="fullName-cancel" onClick={toggleForm} >X</h4>
                </div>
           </div>
        </div> 
    )
}

export default CVSkillsForm;

