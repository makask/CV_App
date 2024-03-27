import React, { useState } from "react";
import "./CVWorkExpItem.css";
import CVWorkExpItemForm from "./forms/CVWorkExpItemForm";

function CVWorkExpItem({id, cvId, workItems, getWorkItems, working_period, profession, company, job_description }){

    const[wasClicked, setWasClicked] = useState(false);
    const[mouseHover, setMouseHover] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    function onMouseHover(){
        setMouseHover(true);
    }

    function offMouseHover(){
        setMouseHover(false);
    }

    async function deleteItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperience/${id}`, {
                method: 'DELETE'
            })
            getWorkItems(cvId);
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <CVWorkExpItemForm 
            toggleForm={toggleForm}
            id={id}
            cvId={cvId}
            getWorkItems={getWorkItems}
            working_period={working_period}
            profession={profession}
            company={company}
            job_description={job_description}
        /> :
        <div className="about">
            <div className="work-item-container" onClick={toggleForm} onMouseEnter={onMouseHover} onMouseLeave={offMouseHover}>
                <div className="work-item-top">
                    <div className="work-item-date">
                        <h5>{working_period}</h5>
                    </div>
                    <div className="work-item-profession">
                        <h5>{profession}</h5>
                    </div>
                    <div className="work-item-delete">
                        {
                            mouseHover && <i className="fa fa-trash" aria-hidden="true" onClick={deleteItem}></i>
                        }
                    </div>
                </div>
                <div className="work-item-bottom">
                    <div className="work-item-company">
                        <h5>{company}</h5>
                    </div>
                    <div className="work-item-job-description">
                        <h5>{job_description}</h5>
                    </div>
                    <div className="work-item-edit">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CVWorkExpItem;