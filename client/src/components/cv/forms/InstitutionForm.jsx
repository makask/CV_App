import React, { useState } from "react";
import "./InstitutionForm.css";

function InstitutionForm({id, cvId, toggleForm, years, speciality, school, getAllInstitutions }){

    const[institution, setInstitution] = useState({
        years : years,
        speciality : speciality,
        school : school
    });

    function handleChange(event){
        const {name, value} = event.target;
        setInstitution((prevValue) => {
            return {
                ...prevValue,
                [name]:value
            }
        });
    }

    async function editInstitution(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/institution/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    years_of_study: institution.years,
                    speciality: institution.speciality,
                    school_name: institution.school
                })
            });
           getAllInstitutions(cvId);
        }catch(err){
            console.error(err);
        }
        toggleForm();
    }

    return(
        <div className="contactInfo education">
                <div className="education-item-left-panel">
                    <h5><input type="text" name="years" value={institution.years} onChange={handleChange}></input></h5>
                    <h4><input type="text" name="speciality" value={institution.speciality} onChange={handleChange}></input></h4>
                    <h4><input type="text" name="school" value={institution.school} onChange={handleChange}></input></h4>   
                </div>
                    <div className="education-item-right-panel">
                    <h4 style={{fontWeight:700}} onClick={toggleForm}>X</h4>
                    <br></br>
                    <h4><i onClick={editInstitution} className="fa fa-check-circle-o fa-md" aria-hidden="true"></i></h4>
                </div>
        </div>
    );
}

export default InstitutionForm;