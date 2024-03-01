import React from "react";
import Header from "./Header";
import LeftPanel from "./LeftPanel";
import WorkArea from "./WorkArea";

function Main(){

    return(
        <div className="main-container">
                <LeftPanel />
                <div className="workarea">
                    <Header /> 
                    <WorkArea />                    
                </div>
        </div>
    );
}

export default Main;