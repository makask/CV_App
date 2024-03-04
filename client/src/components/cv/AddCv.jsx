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
            console.log(title);
            console.log(userEmail);
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ cv_title: title, user_email: userEmail})
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


