import React, { useState } from "react";
import './CVEducationItem.css';


// contactInfo education
function CVEducationItem({ id,cvId, getAllInstitutions, years, speciality, school }){

    const[mouseHover, setMouseHover] = useState(false);

    function handleOnMouseEnter(){
        setMouseHover(true);
    }

    function handleOnMouseLeave(){
        setMouseHover(false);
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
        <div className="contactInfo education" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
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