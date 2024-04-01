import React, { useState } from "react";
import "./CVitemTitleForm.css";

function CVitemTitleForm({ 
    toggleForm, 
    cv_title, 
    userEmail, 
    id, 
    getUserCVs,
    setIsCV,
    setCVid
    }){
    
    const[title, setTitle] = useState(cv_title);

    function handleChange(event){
        setTitle(event.target.value);
    }
    
    async function editCVTitle(event){
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    cvTitle: title
                })
            })
            getUserCVs(userEmail);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    async function deleteCv(){
        setIsCV(false);
        setCVid(id); 
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs/${id}`, {
                method: 'DELETE'
            });
            if(response.status === 200){
                getUserCVs(userEmail);
            }
        }catch(err){
            console.error(err);
        }
    }

    function editCv(){
        setIsCV(true);
        setCVid(id);
    }

    return(
        <div className="cv-item"> 
            <div className="cv-item-upper-div">
                    <p><input type="text" placeholder={title} onChange={handleChange}/></p>
                    <i className="fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editCVTitle}></i>
                    <p className="" onClick={toggleForm}>X</p>           
            </div>
            <hr></hr>
            <div className="cv-item-middle-div">

            </div>
            <div className="cv-item-buttons-div">
                <button className="cv-item-btn cv-item-edit" onClick={editCv}>Edit</button>
                <button className="cv-item-btn cv-item-delete" onClick={deleteCv}>Delete</button>  
            </div>
        </div>
    )
}

export default CVitemTitleForm;

