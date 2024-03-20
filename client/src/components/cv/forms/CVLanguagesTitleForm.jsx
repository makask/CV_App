import React, { useState } from "react";

function CVLanguagesTitleForm({ id, cvId, getLanguagesTitle, toggleForm, languagesTitle }){

    const[title, setTitle] = useState({
        title: languagesTitle[0].title
    });

    function handleChange(event){
        const{name, value} = event.target;
        setTitle(prevValue => {
            return{
                ...prevValue,
                [name] : value
            }
        });
    }
    
    async function editTitle(event){
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languagestitle/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title.title
                })
            });
            getLanguagesTitle(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <form>
            <div className="contactInfo-title">
                    <h3 className="title"><input className="education-title-input" name="title" value={title.title} onChange={handleChange}/></h3>
                <div className="btns-div">
                    <span className="contactInfo-save-form"><i onClick={editTitle} className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i></span>
                    <h2 className="education-cancel-edit" onClick={toggleForm}>x</h2>
                </div>
            </div>
        </form>
    );
}

export default CVLanguagesTitleForm;