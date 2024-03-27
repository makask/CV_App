import React, { useState } from "react";
import "./CVWorkExpItemForm.css";

function CVWorkExpItemForm({ toggleForm, id, cvId, getWorkItems, working_period, profession, company, job_description }){

    const[job, setJob] = useState({
        working_period : working_period,
        profession: profession, 
        company: company,
        job_description: job_description
    });

    function handleChange(event){
        const{name, value} = event.target;
        setJob((prevValue) => {
            return {
                ...prevValue,
                [name]:value
            }
        });
    }

    async function editItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperience/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    working_period: job.working_period,
                    profession: job.profession,
                    company: job.company,
                    job_description: job.job_description
                })
            });
           getWorkItems(cvId);
        }catch(err){
            console.error(err);
        }
        toggleForm();
    }

    return(
        <div className="about">
            <div className="work-item-container">
                <div className="work-item-top">
                    <div className="work-item-date">
                        <h5><input type="text" value={job.working_period} name="working_period" onChange={handleChange}></input></h5>
                    </div>
                    <div className="work-item-profession">
                        <h5><input value={job.profession} name="profession" onChange={handleChange}></input></h5>
                    </div>
                    <div className="work-item-delete">
                        <h4 onClick={toggleForm}>X</h4>
                    </div>
                </div>
                <div className="work-item-bottom">
                    <div className="work-item-company">
                        <h5><input value={job.company} name="company" onChange={handleChange}></input></h5>
                    </div>
                    <div className="work-item-job-description">
                        <h5><input value={job.job_description} name="job_description" onChange={handleChange}></input></h5>
                    </div>
                    <div className="work-item-edit">
                        <i class="fa fa-check-circle-o" aria-hidden="true" onClick={editItem}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CVWorkExpItemForm;