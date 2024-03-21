import React, { useEffect, useRef, useState } from "react";
import CVProfile from "./CVProfile";
import CVContact from "./CVContact";
import CVEducationTitle from "./CVEducationTitle";
import CVLanguagesTitle from "./CVLanguagesTitle";
import CVDriversLicenceTitle from "./CVDriversLicenceTitle";
import CVEducationItem from "./CVEducationItem";
import CVLanguageItem from "./CVLanguageItem";
import './CV.css';


import { useReactToPrint } from 'react-to-print';


function CV({ profileData, getProfileData, setProfileData, setIsCv,  setCVid, id }){

    const[contactData, setContactData] = useState(null);
    const[educationTitle, setEducationTitle] = useState(null);
    const[languagesTitle, setLanguagesTitle] = useState(null);
    const[institutions, setInstitutions] = useState(null);
    const[languages, setLanguages] = useState(null);
    const[drivingLicenceTitle, setDrivingLicenceTitle] = useState(null);
    
    async function getContactsData(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/contact/${id}`);
            const json = await response.json();
            setContactData(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getEducationTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/educationtitle/${id}`);
            const json = await response.json();
            setEducationTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getAllInstitutions(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/institution/${id}`);
            const json = await response.json();
            setInstitutions(json);
        }catch(err){    
            console.error(err);
        }
    }

    async function getLanguagesTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languagestitle/${id}`);
            const json = await response.json();
            setLanguagesTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getAllLanguages(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/languages/${id}`);
            const json = await response.json();
            setLanguages(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getDrivingLicenceTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicencetitle/${id}`);
            const json = await response.json();
            setDrivingLicenceTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getContactsData(id);
        getEducationTitle(id);
        getAllInstitutions(id);
        getLanguagesTitle(id);
        getAllLanguages(id);
        getDrivingLicenceTitle(id);
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
                                    contactData?.map(item => <CVContact 
                                    key={"0"} id={item.id} 
                                    contactData={contactData} 
                                    getContactsData={getContactsData}/>)
                                }
                                {
                                    educationTitle?.map(title => <CVEducationTitle 
                                    key={"0"} 
                                    id={title.id} 
                                    educationTitle={educationTitle} 
                                    getEducationTitle={getEducationTitle}
                                    getAllInstitutions={getAllInstitutions}
                                    cvId={id}
                                    />)
                                }
                                {
                                    institutions?.map((institution) => <CVEducationItem 
                                    key={institution.id} 
                                    id={institution.id} 
                                    cvId={id} 
                                    getAllInstitutions={getAllInstitutions} 
                                    years = {institution.years_of_study}  
                                    speciality = {institution.speciality}
                                    school = {institution.school_name}
                                    />)
                                }
                                {
                                    languagesTitle?.map(title => <CVLanguagesTitle 
                                        key={"0"}
                                        id={title.id}
                                        cvId={id}
                                        languagesTitle={languagesTitle}
                                        getLanguagesTitle={getLanguagesTitle}
                                        getAllLanguages={getAllLanguages}
                                    />)
                                }
                                {
                                    languages?.map(language => <CVLanguageItem 
                                        key={language.id}
                                        id={language.id}
                                        cvId={language.cv_id}
                                        language={language.language}
                                        getAllLanguages={getAllLanguages}
                                    />)
                                }
                                {
                                    drivingLicenceTitle?.map(title => <CVDriversLicenceTitle 
                                        key={title.id} 
                                        cvId={id} 
                                        title={drivingLicenceTitle}
                                        getDrivingLicenceTitle={getDrivingLicenceTitle}
                                    />)
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