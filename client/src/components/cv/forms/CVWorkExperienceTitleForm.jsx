import React,{useState} from "react";

function CVWorkExperienceTitleForm({ cvId, workExperienceTitle, getWorkExperienceTitle, toggleForm }){

    const [title, setTitle] = useState(workExperienceTitle[0].title);

    function handleChange(event){
        setTitle(event.target.value);
    }

    async function editWorkExperienceTitle(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperiencetitle/${cvId}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title
                }) 
            });
            getWorkExperienceTitle(cvId);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="about-me-title">
            <div className="about-me-title-div">
                <input type="text" name="title" value={title} onChange={handleChange}></input>
                <i className="fullName-edit fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editWorkExperienceTitle}></i>
                <p className="fullName-cancel" onClick={toggleForm}>X</p>
            </div>
        </div>
    )
}

export default CVWorkExperienceTitleForm;

