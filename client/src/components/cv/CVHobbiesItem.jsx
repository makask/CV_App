import React, { useState } from "react";
import "./CVHobbiesItem.css";
import CVHobbiesItemForm from "./forms/CVHobbiesItemForm";

function CVHobbiesItem({ id, cvId, hobbie, getHobbies}){

    const[mouseHover, setMouseHover] = useState(false);
    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function onMouseEnter(){
        setMouseHover(true);
    }

    function onMouseLeave(){
        setMouseHover(false);
    }

    async function deleteItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbies/${id}`, {
                method: 'DELETE'
            })
            getHobbies(cvId);
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <CVHobbiesItemForm
            toggleForm={toggleForm}
            id={id}
            cvId={cvId}
            hobbie={hobbie}
            getHobbies={getHobbies}
        /> :
        <div className="about" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={toggleForm}>
            <div className="hobbies-item-container">
                <div className="hobbies-upper-div">
                    <p>{hobbie}</p>
                </div>
                <div className="hobbies-bottom-div">
                    {
                        mouseHover && <i id="hobbies-trash-icon" class="fa fa-trash" aria-hidden="true" onClick={deleteItem}></i>
                    }
                </div>
            </div>
        </div>
    )
}

export default CVHobbiesItem;