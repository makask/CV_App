import React from "react";

function CVitem({id, cv_title}){

   function handleClick(){
    console.log("Upper clicked");
   }

   function editCv(){
    console.log("Edit clicked");
   }

   function deleteCv(){
    console.log("Delete clicked");
   }

    return (
        <div className="cv-item"> 
            <div className="cv-item-upper" onClick={handleClick}>
                <p>{cv_title}</p>
                <hr></hr>
            </div>
            <div className="cv-item-buttons">
                <button className="cv-item-btn cv-item-edit" onClick={editCv}>Edit</button>
                <button className="cv-item-btn cv-item-delete" onClick={deleteCv}>Delete</button>  
            </div>
        </div>
    );
}

export default CVitem;

