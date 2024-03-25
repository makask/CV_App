import React, { useState } from "react";
import "./CVAboutMeTitleForm.css";

function CVAboutMeTitleForm({ toggleForm, cvId, aboutMeTitle, getAboutMeTitle }){

    const [title, setTitle] = useState(aboutMeTitle[0].title);
    
    function handleChange(event){
       setTitle(event.target.value);
    }

    async function editAboutMetitle(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutmetitle/${cvId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title
                }) 
            });
            getAboutMeTitle(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }


    return (
        <div className="about-me-title">
            <div className="about-me-title-div">
                <input type="text" name="title" value={title} onChange={handleChange}></input>
                <i className="fullName-edit fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editAboutMetitle}></i>
                <p className="fullName-cancel" onClick={toggleForm}>X</p>
            </div>
        </div>
    )
}

export default CVAboutMeTitleForm;
