import React, { useState } from "react";
import AddCv from "../cv/AddCv";
import { useCookies } from "react-cookie";


function LeftPanel({ setSection, section, getUserCVs, getUserAdvertisements }){

    const [cookies] = useCookies(null);
    const userEmail = cookies.Email; 
    
    const [toggleForm, setToggleForm ] = useState(false);

    function handleToggleForm(){
        setToggleForm(!toggleForm);
    }

    async function addNewAdvertisement(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/advertisements`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    link: "Add job offering link here...",
                    user_email: userEmail
                })
            });
            getUserAdvertisements(userEmail);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div className="left-panel-container">
            <div className="left-panel-menu">
                <h2 onClick={()=>setSection('Home')}><i className="fa fa-home" aria-hidden="true"></i> Home </h2>
                <h2 onClick={()=>setSection('Profile')}><i className="fa fa-user" aria-hidden="true"></i> Profile </h2>
                <div className="lp-cvs">
                    <h2 onClick={()=> {
                        setSection('CVs');
                    }}><i className="fa fa-address-card-o" aria-hidden="true"></i> CVs  
                    </h2>
                    { (section==="CVs" && !toggleForm) && <button onClick={handleToggleForm} className="lp-add-cv-btn">+</button> }
                </div> 
                { toggleForm && <AddCv getUserCVs={getUserCVs} toggleForm={handleToggleForm}/>}          
                <div className="lp-assignments">
                    <h2 onClick={()=>{
                        setSection('Assignments');
                    }}><i className="fa fa-tasks" aria-hidden="true"></i> Assignments
                    </h2>
                    { (section==="Assignments" && !toggleForm) && <button className="lp-add-assignment-btn">+</button> }
                </div>
                <div className="lp-advertisements">
                    <h2 onClick={()=>{
                        setSection('Advertisements');
                    }}><i className="fa fa-newspaper-o" aria-hidden="true"></i>Job Offerings
                    </h2>
                    { (section==="Advertisements" && !toggleForm) && <button className="lp-add-adv-btn" onClick={addNewAdvertisement}>+</button> }
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;