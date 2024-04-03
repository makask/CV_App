import React, {useState} from "react";
import "./Task.css";
import TaskForm from "./TaskForm";

function Task({id, task, getUserTasks, userEmail }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    async function deleteTask(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${id}`, {
                method: 'DELETE'
            });
            if(response.status === 200){
                getUserTasks(userEmail);
            }
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <TaskForm toggleForm={toggleForm} id={id} task={task} getUserTasks={getUserTasks} userEmail={userEmail} /> :
        <div className="adv-container">
            <div className="adv-item">
                <div className="adv-item-link">
                    <p>{task}</p>
                </div>
                <div className="adv-item-buttons">
                    <i class="adv-item-edit-icon fa fa-pencil-square-o" aria-hidden="true" onClick={toggleForm}></i>
                    <i className="adv-item-delete-icon fa fa-trash" aria-hidden="true" onClick={deleteTask}></i>
                </div>
            </div>
        </div>
    )
}

export default Task;