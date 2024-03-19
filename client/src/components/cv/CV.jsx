import React, { useEffect, useRef, useState } from "react";
import CVProfile from "./CVProfile";
import CVContact from "./CVContact";
import './CV.css';


import { useReactToPrint } from 'react-to-print';


function CV({ profileData, getProfileData, setProfileData, setIsCv,  setCVid, id }){

    const[contactData, setContactData] = useState(null);

    async function getContactsData(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/contact/${id}`);
            const json = await response.json();
            setContactData(json);
        }catch(err){
            console.error(err);
        }
    }


    useEffect(()=>{
        getContactsData(id);
    },[]);
    
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
                                { 
                                    contactData?.map(item => <CVContact key={"0"} id={item.id} contactData={contactData} getContactsData={getContactsData}/>)
                                }   
                            </div>
                            <div className="right-panel">
                                
                            </div>
                    </div>
                </div>
                <button className="btn-cv-print" onClick={handlePrint}>Download as PDF</button>
            </div>
    );
}

export default CV;