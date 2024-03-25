import React, { useState } from "react";
import './CVLangItemForm.css';

function CVLangItemForm({id, cvId, getAllLanguages, toggleForm, language}){

    const[lang, setLang] = useState({
        language : language
    });
    
    function handleChange(event){
        const{name, value} = event.target;
        setLang(prevValue => {
            return{
                ...prevValue,
                [name] : value
            }
        });
    }

    async function editLangItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languages/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    language: lang.language
                })
            });
            getAllLanguages(cvId);
        }catch(err){
            console.error(err);
        }
        toggleForm(); 
    }

    return(
        <div className="contactInfo languages">
        <div className="language language-item-form ">
            <p className="text lang-text"><input type="text" name="language" value={lang.language} onChange={handleChange} required></input></p> 
            <span className="contactInfo-save-form"><i onClick={editLangItem}  className="fa fa-check-circle-o fa-lg edit-lang-item" aria-hidden="true"></i></span>
            <h2 className="education-cancel-edit" onClick={toggleForm}>x</h2>  
        </div>
    </div>
    )
}

export default CVLangItemForm;