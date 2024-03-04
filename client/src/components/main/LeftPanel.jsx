import React, { useState } from "react";
import AddCv from "../cv/AddCv";

function LeftPanel({ setSection, section }){

    const [toggleForm, setToggleForm] = useState(false);

    function handleToggleForm(){
        setToggleForm(!toggleForm);
    }

    console.log(toggleForm);

    return(
        <div className="left-panel-container">
            <div className="left-panel-menu">
                <h2 onClick={()=>setSection('Home')}>🏡 Home </h2>
                <h2 onClick={()=>setSection('Profile')}>🙋‍♂️ Profile </h2>
                <div className="lp-cvs">
                    <h2 onClick={()=> {
                        setSection('CVs');
                    }}>📰 CVs  
                    </h2>
                    { (section==="CVs" && !toggleForm) && <button onClick={handleToggleForm} className="lp-add-cv-btn">+</button> }
                </div> 
                { toggleForm && <AddCv toggleForm={handleToggleForm}/>}          
                <h2 onClick={()=>setSection('Assignments')}>📅 Assignments</h2>
                <h2 onClick={()=>setSection('Advertisements')}>📑Job advertisements</h2>
            </div>
        </div>
    );
}

export default LeftPanel;