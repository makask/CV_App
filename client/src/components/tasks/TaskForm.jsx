import React,{useState} from "react";

function TaskForm({toggleForm, id, task, getUserTasks, userEmail }){

    const[userTask, setUserTask] = useState(task);

    function handleChange(event){
        setUserTask(event.target.value);
    }

    async function editTask(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    task: userTask
                })
            })
            getUserTasks(userEmail);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }


    return(
        <div className="adv-container">
            <div className="adv-item">
                <div className="adv-item-link">
                    <input type="text" placeholder={userTask} onChange={handleChange}></input>
                </div>
                <div className="adv-item-buttons">
                    <i className="adv-item-form-update-icon fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editTask}></i>
                    <h3 onClick={toggleForm}>x</h3>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;