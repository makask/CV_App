import React, { useState } from "react";
import AddCv from "../cv/AddCv";

function LeftPanel({ setSection, section, getUserCVs }){

    const [toggleForm, setToggleForm ] = useState(false);

    function handleToggleForm(){
        setToggleForm(!toggleForm);
    }

    return(
        <div className="left-panel-container">
            <div className="left-panel-menu">
                <h2 onClick={()=>setSection('Home')}><i class="fa fa-home" aria-hidden="true"></i> Home </h2>
                <h2 onClick={()=>setSection('Profile')}><i class="fa fa-user" aria-hidden="true"></i> Profile </h2>
                <div className="lp-cvs">
                    <h2 onClick={()=> {
                        setSection('CVs');
                    }}><i class="fa fa-address-card-o" aria-hidden="true"></i> CVs  
                    </h2>
                    { (section==="CVs" && !toggleForm) && <button onClick={handleToggleForm} className="lp-add-cv-btn">+</button> }
                </div> 
                { toggleForm && <AddCv getUserCVs={getUserCVs} toggleForm={handleToggleForm}/>}          
                <h2 onClick={()=>setSection('Assignments')}><i class="fa fa-tasks" aria-hidden="true"></i> Assignments</h2>
                <h2 onClick={()=>setSection('Advertisements')}><i class="fa fa-newspaper-o" aria-hidden="true"></i>Job advertisements</h2>
            </div>
        </div>
    );
}

export default LeftPanel;