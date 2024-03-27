import React, { useState } from "react";
import "./CVHobbiesItemForm.css";

function CVHobbiesItemForm({toggleForm, id, cvId, hobbie, getHobbies }){

    const[itemHobbie, setItemHobbie] = useState(hobbie);

    function handleChange(event){
        setItemHobbie(event.target.value);
    }

    async function editHobbie(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbies/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hobbie: itemHobbie
                })
            });
           getHobbies(cvId);
        }catch(err){
            console.error(err);
        }
        toggleForm();
    }

    return(
        <div className="about">
            <div className="hobbies-item-container">
                <div className="hobbies-upper-div">
                    <p><input type="text" name="hobbie" value={itemHobbie} onChange={handleChange}></input></p>
                </div>
                <div className="hobbies-bottom-div">
                    <i id="hobbies-submit-icon" className="fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editHobbie}></i>
                    <h4 id="hobbies-cancel-icon" onClick={toggleForm}>X</h4>
                </div>
            </div>
        </div>
    )
}

export default CVHobbiesItemForm;