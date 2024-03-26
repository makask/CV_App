import React, {useState} from "react";
import CVHobbiesTitleForm from "./forms/CVHobbiesTitleForm";

function CVHobbiesTitle({ cvId, hobbiesTitle, getHobbiesTitle }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }


    return(
        wasClicked ? <CVHobbiesTitleForm 
            cvId={cvId}
            hobbiesTitle={hobbiesTitle}
            getHobbiesTitle={getHobbiesTitle}
            toggleForm={toggleForm}
        /> :
        <div className="about-me-title">
            <h2 onClick={toggleForm} className="title2">{hobbiesTitle[0].title}</h2>
        </div>
    )
}

export default CVHobbiesTitle;

