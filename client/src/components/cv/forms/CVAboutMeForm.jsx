import React, { useState } from "react";
import "./CVAboutMeForm.css";

function CVAboutMeForm({toggleForm, cvId, aboutMe, getAboutMe}){

    const[aboutText, setAboutText] = useState(aboutMe[0].about_text);
    
    function handleChange(event){
        setAboutText(event.target.value);
    }

    async function editAboutText(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutme/${cvId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    about_text: aboutText
                }) 
            });
            getAboutMe(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="about">
            <p className="paragraph" rows="10" cols="50">
                <textarea onChange={handleChange} name="about_text" value={aboutText}>
                    {aboutText}
                </textarea>
                <div className="about-form-buttons">
                    <i className="fullName-edit fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editAboutText}></i>
                    <p className="fullName-cancel" onClick={toggleForm}>X</p>
                </div>
            </p>
        </div>
    )
    
}

export default CVAboutMeForm;