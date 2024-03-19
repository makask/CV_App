import React, { useState } from "react";
import './CVEducationTitle.css';
import CVEducationTitleForm from './forms/CVEducationTitleForm';

function CVEducationTitle({id, educationTitle, getEducationTitle}){

    const [wasClicked, setWasClicked] = useState(false);
    const [onHover, setOnHover] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function handleMouseEnter(){
        setOnHover(true);
    }

    function handleMouseLeave(){
        setOnHover(false);
    }

    return(
        wasClicked ? <CVEducationTitleForm id={id} educationTitle={educationTitle} getEducationTitle={getEducationTitle} toggleForm={toggleForm}/> :  
                                                <div className="contactInfo-title" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                    <h3 className="title education-title" onClick={toggleForm}>{educationTitle[0].title}</h3>
                                                    {
                                                        onHover && <h2 className="add-school">+</h2>
                                                    }                        
                                                </div>
    );
}

export default CVEducationTitle;