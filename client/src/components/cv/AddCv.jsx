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
           
            const contactResponse = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/contact/${id}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: id })
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

