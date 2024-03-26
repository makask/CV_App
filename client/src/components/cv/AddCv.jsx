import React, { useState } from "react";
import { useCookies } from "react-cookie";

function AddCv({ toggleForm, getUserCVs }){

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [title, setTitle] = useState("");
    const userEmail = cookies.Email;

    function handleChange(event){
       setTitle(event.target.value);
    }

    async function addNewCV(event)
    {   
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ cv_title: title, user_email: userEmail})
            });
            const data = await fetch(`${process.env.REACT_APP_SERVERURL}/getCvId`).then(res => res.json());
            const id = data.id;

            //Add default cv profile
            const profileResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/cvprofile/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            });
            
            // Add default cv contacts
            const contactResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/contact/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            });
            // Add default cv education title
            const defaultEducationTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/educationtitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
            });
            // Add default cv languages title
            const defaultLangTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languagestitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id})
            });
            // Add default cv driving licence title
            const defaultLicenceTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicencetitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id})
            });

            //Add default cv driving licence
            const defaultLicence = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicence/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id})
            });

            //Add default cv about me title
            const defaultAboutMeTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutmetitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'} 
            });
            //Add default about me text
            const aboutMeText = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutme/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'} 
            });
            //Add default cv work experience title
            const defWorkExperienceTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperiencetitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'} 
            });
            //Add default cv skills title
            const defSkillsTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/skillstitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'} 
            });
            //Add default cv hobbies title
            const defHobbiesTitle = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbiestitle/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'} 
            });
            getUserCVs();
        }catch(err){
            console.error(err);
        }
        toggleForm();
    }

    return(
        <div className="add-cv-container">
            <div className="add-cv-btns">
                <form>
                    <input type="text" name="cv_title" value={title} onChange={handleChange} placeholder="Enter CV title"></input>
                    <button type="submit" onClick={addNewCV}>+</button>                    
                    <button type="button" onClick={()=>toggleForm()}>x</button>
                </form>
            </div> 
        </div>
    );
}

export default AddCv;


