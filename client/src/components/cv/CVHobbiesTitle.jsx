import React, {useState} from "react";
import CVHobbiesTitleForm from "./forms/CVHobbiesTitleForm";
import "./CVHobbiesTitle.css";

function CVHobbiesTitle({ cvId, hobbiesTitle, getHobbiesTitle, getHobbies }){

    const[wasClicked, setWasClicked] = useState(false);
    const[mouseOver, setMouseOver] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function mouseEnter(){
        setMouseOver(true);
    }

    function mouseLeave(){
        setMouseOver(false);    
    }

    async function addNewHobbie(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbies/${cvId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
            })
            getHobbies(cvId);
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <CVHobbiesTitleForm 
            cvId={cvId}
            hobbiesTitle={hobbiesTitle}
            getHobbiesTitle={getHobbiesTitle}
            toggleForm={toggleForm}
        /> :
        <div className="about-me-title" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <h2 id="hobbies-title" onClick={toggleForm} className="title2">{hobbiesTitle[0].title}</h2>
            {
                mouseOver && <h3 id="hobbies-title-plus" onClick={addNewHobbie}>+</h3>
            }
        </div>
    )
}

export default CVHobbiesTitle;

