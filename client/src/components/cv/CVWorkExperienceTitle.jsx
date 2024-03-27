import React, { useState } from "react";
import CVWorkExperienceTitleForm from "./forms/CVWorkExperienceTitleForm";
import "./CVWorkExperienceTitle.css";


function CVWorkExperienceTitle({ cvId, workExperienceTitle, getWorkExperienceTitle, getWorkItems }){

    const[wasClicked, setWasClicked] = useState(false);
    const[mouseOver, setMouseOver] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function mouseEnter(){
        setMouseOver(true);
    }

    function mouseLeave(){
        setMouseOver(false);    
    }

    async function addNewWorkExpItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperience/${cvId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
            })
            getWorkItems(cvId);
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <CVWorkExperienceTitleForm 
            cvId={cvId}
            workExperienceTitle={workExperienceTitle}
            getWorkExperienceTitle={getWorkExperienceTitle}
            toggleForm={toggleForm}
        /> :
        <div className="about-me-title" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <h2 id="work-exp-title" className="title2" onClick={toggleForm}>{workExperienceTitle[0].title}</h2>
            {
                mouseOver && <h3 id="work-exp-title-plus" onClick={addNewWorkExpItem}>+</h3>
            }     
        </div>
    )
}

export default CVWorkExperienceTitle;

