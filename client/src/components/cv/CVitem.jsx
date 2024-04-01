import React, { useState } from "react";
import "./CVitem.css";
import CVitemTitleForm from "./forms/CVitemTitleForm";
import { useCookies } from "react-cookie"; //

function CVitem({id, cv_title, setIsCV, setCVid, getUserCVs }){

   const[titleClicked, setTitleClicked] = useState(false);
   const [cookies] = useCookies(null);
   const userEmail = cookies.Email; //
    
   function toggleForm(){
      setTitleClicked(!titleClicked);
   }

   function handleClick(){
    setIsCV(true);
    setCVid(id);
   }

   function editCv(){
    setIsCV(true);
    setCVid(id);
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

    return (
        titleClicked ? <CVitemTitleForm 
            toggleForm={toggleForm}
            cv_title={cv_title}
            userEmail={userEmail} 
            id={id}
            getUserCVs={getUserCVs}
            editCv={editCv}
            deleteCv={deleteCv} 
            setIsCV={setIsCV}
            setCVid={setCVid}  
            /> :
        <div className="cv-item"> 
            <div className="cv-item-upper">
                <p onClick={toggleForm}>{cv_title}</p>
                <hr></hr>
            </div>
            <div className="cv-item-middle" onClick={handleClick}>

            </div>
            <div className="cv-item-buttons">
                <button className="cv-item-btn cv-item-edit" onClick={editCv}>Edit</button>
                <button className="cv-item-btn cv-item-delete" onClick={deleteCv}>Delete</button>  
            </div>
        </div>
    );
}

export default CVitem;

