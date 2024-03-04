import React from "react";

function CVitem({id, cv_title, setIsCV, setCVid, getUserCVs }){

   function handleClick(){
    setIsCV(true);
    setCVid(id);
   }

   function editCv(){
    setIsCV(true);
    setCVid(id);
   }

   async function deleteCv(){
    setIsCV(false);
    setCVid(id); 
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cvs/${id}`, {
            method: 'DELETE'
        });
        if(response.status === 200){
            getUserCVs();
        }
    }catch(err){
        console.error(err);
    }
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

