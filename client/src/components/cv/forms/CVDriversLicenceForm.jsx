import React, { useState } from "react";
import "./CVEducationTitleForm.css";

function CVDriversLicenceForm({ toggleForm, cvId, title, getDrivingLicenceTitle }){

    const[licenceTitle, setLicenceTitle] = useState({
        title : title[0].title  
    });

    function handleChange(event){
        const{name, value} = event.target;
        setLicenceTitle(prevValue => {
            return{
                ...prevValue, 
                [name] : value
            }
        });
    }

    async function editTitle(event){
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicencetitle/${cvId}`,{
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: licenceTitle.title
                })
            });
            getDrivingLicenceTitle(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <form>
            <div className="contactInfo-title">
                    <h3 className="title"><input onChange={handleChange} className="education-title-input" name="title" value={licenceTitle.title} /></h3>
                <div className="btns-div">
                    <span className="contactInfo-save-form"><i onClick={editTitle} className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i></span>
                    <h2 className="education-cancel-edit" onClick={toggleForm}>x</h2>
                </div>
            </div>
        </form>
    );
}

export default CVDriversLicenceForm;