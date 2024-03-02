import React from "react";

function LeftPanel({ setSection }){

    return(
        <div className="left-panel-container">
            <div className="left-panel-menu">
                <h2 onClick={()=>setSection('Home')}>🏡 Home</h2>
                <h2 onClick={()=>setSection('Profile')}>🙋‍♂️ Profile</h2>
                <h2 onClick={()=>setSection('CVs')}>📰 CVs</h2>
                <h2 onClick={()=>setSection('Assignments')}>📅 Assignments</h2>
                <h2 onClick={()=>setSection('Advertisements')}>📑Job advertisements</h2>
            </div>
        </div>
    );
}

export default LeftPanel;