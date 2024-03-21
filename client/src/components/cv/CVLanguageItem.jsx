import React, { useState } from "react";
import "./CVLanguageItem.css";
import CVLangItemForm from "./forms/CVLangItemForm";

function CVLanguageItem({id, cvId, language, getAllLanguages}){

    const[onHover, setOnHover] = useState(false);
    const[wasClicked, setWasClicked] = useState(false);

    function handleMouseHover(){
        setOnHover(!onHover);
    }

    function toggleForm(){
       setWasClicked(!wasClicked);
    }

    async function deleteLanguageItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languages/${id}`,{
                method: 'DELETE'
            });
            getAllLanguages(cvId);
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <CVLangItemForm id={id} cvId={cvId} getAllLanguages={getAllLanguages}  language={language} toggleForm={toggleForm}/> :
        <div className="contactInfo languages" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} onClick={toggleForm}>
            <div className="language">
                <p className="text lang-text">{language}</p>
                {
                    onHover && <i className="lang-delete fa fa-trash-o" aria-hidden="true" onClick={deleteLanguageItem}></i>
                }      
            </div>
        </div>
    );
}

export default CVLanguageItem;