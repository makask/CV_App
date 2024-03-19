import React, { useRef } from "react";
import CVProfile from "./CVProfile";
import CVContact from "./CVContact";
import './CV.css';

import { useReactToPrint } from 'react-to-print';


function CV({ profileData, getProfileData, setProfileData, setIsCv,  setCVid, id }){

    function handleClick(){
        setIsCv(false);
        setCVid(null);
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    

    return (       
            <div className="cv">
                <button className="btn-cv-return" onClick={handleClick}>Go Back {id}</button>
                    <div className="cv-print-area" ref={componentRef}>
                        <div className="cv-container">
                            <div className="left-panel">
                                <CVProfile profileData={profileData} getProfileData={getProfileData} setProfileData={setProfileData}/>
                                <CVContact />
                            </div>
                            <div className="right-panel">
                                dsadadsadsadsa
                            </div>
                    </div>
                </div>
                <button className="btn-cv-print" onClick={handlePrint}>Download as PDF</button>
            </div>
    );
}

export default CV;