import React, { useState } from "react";
import './CVEducationItem.css';
import InstitutionForm from "./forms/InstitutionForm";


// contactInfo education
function CVEducationItem({ id,cvId, getAllInstitutions, years, speciality, school }){

    const[mouseHover, setMouseHover] = useState(false);
    const[wasClicked, setWasClicked] = useState(false);

    function handleOnMouseEnter(){
        setMouseHover(true);
    }

    function handleOnMouseLeave(){
        setMouseHover(false);
    }

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    async function deleteEducationItem(){
       try{
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/institution/${id}`, {
            method: 'DELETE'
        });
        if(response.status === 200){
            getAllInstitutions(cvId);
        }
       }catch(err){
        console.error(err);
       }
    }

    return(
        wasClicked ? <InstitutionForm id={id} cvId={cvId} toggleForm={toggleForm} years={years} speciality={speciality} school={school} getAllInstitutions={getAllInstitutions} /> :
        <div className="contactInfo education" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={toggleForm}>
            <div className="education-item-left-panel">
                <h5>{years}</h5>
                <h4>{speciality}</h4>
                <h4>{school}</h4>   
            </div>
            <div className="education-item-right-panel">
                {
                    mouseHover && <i className="fa fa-trash-o" aria-hidden="true" onClick={deleteEducationItem}></i>
                }
            </div>
        </div>
    )
}

export default CVEducationItem;

/* 
    
           <h5>2021 - Present</h5>
           <h4>Software development</h4>
           <h4>Tallinn Polytechnic School</h4>   

*/