import React, { useState } from "react";
import CVDrivingLicenceForm from "./forms/CVDrivingLicenceForm";

function CVDrivingLicence({ cvId, licence, getDrivingLicence }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <CVDrivingLicenceForm toggleForm={toggleForm} cvId={cvId} getDrivingLicence={getDrivingLicence} licence={licence}/> :
        <div className="contactInfo licence" onClick={toggleForm}>
            <ul>
                <li>
                    <span className="icon"><i class="fa fa-car" aria-hidden="true"></i></span>
                    <span className="text">{licence[0].licences}</span>    
                </li>                        
            </ul>
        </div>
    )
}

export default CVDrivingLicence;