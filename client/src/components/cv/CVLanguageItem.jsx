import React, { useState } from "react";
import "./CVLanguageItem.css";

function CVLanguageItem({id, cvId, language, getAllLanguages}){

    const[onHover, setOnHover] = useState(false);

    function handleMouseHover(){
        setOnHover(!onHover);
    }

    async function deleteLanguageItem(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languages/${id}`,{
                method: 'DELETE'
            });
            getAllLanguages(cvId);
        }catch(err){
            console.error(err);
        }
    }

    //<span class="text">English&nbsp;&nbsp;B2</span>
    return(
        <div className="contactInfo languages" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
            <div className="language">
                <p className="text lang-text">English B2</p>
                {
                    onHover && <i className="lang-delete fa fa-trash-o" aria-hidden="true" onClick={deleteLanguageItem}></i>
                }      
            </div>
        </div>
    );
}

export default CVLanguageItem;