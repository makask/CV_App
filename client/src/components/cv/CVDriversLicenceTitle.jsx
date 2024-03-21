import React, {useState} from "react";
import './CVEducationTitle.css';
import CVDriversLicenceForm from "./forms/CVDriversLicenceForm";

function CVDriversLicenceTitle({cvId, title, getDrivingLicenceTitle}){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }
    
    return(
        wasClicked ? <CVDriversLicenceForm toggleForm={toggleForm} cvId={cvId} title={title} getDrivingLicenceTitle={getDrivingLicenceTitle}/> :
        <div className="contactInfo-title" onClick={toggleForm}>
            <h3 className="title education-title">{title[0].title}</h3>                        
        </div>
    );
}

export default CVDriversLicenceTitle;