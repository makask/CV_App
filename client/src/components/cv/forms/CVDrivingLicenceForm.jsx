import React, { useState } from "react";
import './CVDrivingLicenceForm.css';

function CVDrivingLicenceForm({cvId, getDrivingLicence, toggleForm, licence}){

    const[licences, setLicences] = useState({
        licence: licence[0].licences
    });
    
    function handleChange(event){
        const{name, value} = event.target;
        setLicences(prevValue => {
            return{
                ...prevValue,
                [name] : value
            }
        });
    }

    async function editLicences(event){
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicence/${cvId}`,{
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    licences: licences.licence
                })
            });
            getDrivingLicence(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="contactInfo licence">
            <ul>
                <li>
                    <div style={{display:"flex", alignItems:"center", fontWeight:"bolder"}}>
                        <span className="icon"><i class="fa fa-car" aria-hidden="true"></i></span>
                        <span className="text"><input className="licence-input" type="text" value={licences.licence} name="licence" onChange={handleChange}></input></span> 
                        <span className="licence-edit"><i className="fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editLicences}></i></span>   
                        <span className="licence-cancel" style={{fontWeight:"900"}} onClick={toggleForm}>X</span>
                    </div>
                </li>                        
            </ul>
        </div>
    )
}

export default CVDrivingLicenceForm;