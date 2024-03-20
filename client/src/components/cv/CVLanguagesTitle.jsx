import React, {useState} from "react";
import './CVEducationTitle.css';
import './forms/CVLanguagesTitleForm';
import CVLanguagesTitleForm from "./forms/CVLanguagesTitleForm";

function CVLanguagesTitle({ id, cvId, languagesTitle, getLanguagesTitle }){

    const [wasClicked, setWasClicked] = useState(false);
    const [onHover, setOnHover] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function handleMouseEnter(){
        setOnHover(true);
    }

    function handleMouseLeave(){
        setOnHover(false);
    }

    return(
        wasClicked ? <CVLanguagesTitleForm id={id} cvId={cvId} getLanguagesTitle={getLanguagesTitle} languagesTitle={languagesTitle} toggleForm={toggleForm}/> : 
        <div className="contactInfo-title" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h3 className="title education-title" onClick={toggleForm}>{languagesTitle[0].title}</h3>
            {
                onHover && <h2 className="add-school">+</h2>
            }     
        </div>
    );
}

export default CVLanguagesTitle;