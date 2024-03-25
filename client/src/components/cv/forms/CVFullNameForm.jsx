import React, { useState } from "react";
import './CVFullNameForm.css';

function CVFullNameForm({toggleForm, cvProfileData, cvId, getCVProfileData}){

    const [fullName, setFullName] = useState(cvProfileData[0].fullname);

    function handleChange(event){
        setFullName(event.target.value);
    }

    async function editFullName(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/cvfullname/${cvId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    fullname: fullName
                }) 
            });
            getCVProfileData(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="fullName">
                <div className="fullName-name">
                    <h2><input onChange={handleChange} type="text" name="fullname" value={fullName}></input></h2> 
                </div>
                <div className="fullName-buttons">
                    <i className="fullName-edit fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editFullName}></i>
                    <p className="fullName-cancel" onClick={toggleForm}>X</p>
                </div>
            </div>
    );
}

export default CVFullNameForm;