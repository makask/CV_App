import React, { useEffect, useRef, useState } from "react";
import CVProfile from "./CVProfile";
import CVContact from "./CVContact";
import CVEducationTitle from "./CVEducationTitle";
import CVLanguagesTitle from "./CVLanguagesTitle";
import CVDriversLicenceTitle from "./CVDriversLicenceTitle";
import CVEducationItem from "./CVEducationItem";
import CVLanguageItem from "./CVLanguageItem";
import CVDrivingLicence from "./CVDrivingLicence";
import CVAboutMeTitle from "./CVAboutMeTitle";
import CVAboutMe from "./CVAboutMe";
import CVAboutMeForm from "./forms/CVAboutMeForm";
import './CV.css';


import { useReactToPrint } from 'react-to-print';


function CV({ profileData, getProfileData, setProfileData, setIsCv,  setCVid, id }){

    const[cvProfileData, setCvProfileData] = useState(null);
    const[contactData, setContactData] = useState(null);
    const[educationTitle, setEducationTitle] = useState(null);
    const[languagesTitle, setLanguagesTitle] = useState(null);
    const[institutions, setInstitutions] = useState(null);
    const[languages, setLanguages] = useState(null);
    const[drivingLicenceTitle, setDrivingLicenceTitle] = useState(null);
    const[drivingLicence, setDrivingLicence] = useState(null);
    const[aboutMeTitle, setAboutMeTitle] = useState(null);
    const[aboutMe, setAboutMe] = useState(null);

    async function getCVProfileData(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/cvprofile/${id}`);
            const json = await response.json();
            setCvProfileData(json);
        }catch(err){
            console.error(err);
        }
    }
    
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

    async function getDrivingLicence(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/drivinglicence/${id}`);
            const json = await response.json();
            setDrivingLicence(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getAboutMeTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutmetitle/${id}`);
            const json = await response.json();
            setAboutMeTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getAboutMe(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/aboutme/${id}`);
            const json = await response.json();
            setAboutMe(json);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        getCVProfileData(id);
        getContactsData(id);
        getEducationTitle(id);
        getAllInstitutions(id);
        getLanguagesTitle(id);
        getAllLanguages(id);
        getDrivingLicenceTitle(id);
        getDrivingLicence(id);
        getAboutMeTitle(id);
        getAboutMe(id);
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
                                {
                                    cvProfileData?.map(data => <CVProfile 
                                        key={id}
                                        cvId={id}
                                        cvProfileData={cvProfileData}
                                        getCVProfileData={getCVProfileData}
                                    />)
                                }
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
                                {
                                    drivingLicence?.map(licence => <CVDrivingLicence 
                                        key={licence.id}
                                        cvId={id}
                                        licence={drivingLicence}
                                        getDrivingLicence={getDrivingLicence}
                                    />)
                                }
                            </div>
                            <div className="right-panel">
                                    {
                                        aboutMeTitle?.map(title => <CVAboutMeTitle 
                                            key={title.id}
                                            cvId={id}
                                            aboutMeTitle={aboutMeTitle}
                                            getAboutMeTitle={getAboutMeTitle}
                                        />)
                                    }
                                    {
                                        aboutMe?.map(about => <CVAboutMe 
                                            key={about.id}
                                            cvId={id}
                                            aboutMe={aboutMe}
                                            getAboutMe={getAboutMe}
                                       />)
                                    }
                                    <div>
                                        <h2 className="title2">WORK EXPERIENCE</h2>
                                    </div>

                                <div className="about">
                                    <div className="box">
                                        <div className="year_company">
                                            <h5>2021.09-2021.10 </h5>
                                            <h5>Sample Company</h5>
                                        </div>
                                        <div className="text">
                                            <h4>SOFTWARE DEVELOPMENT INTERN</h4>
                                            <p>Sample Job description.</p>
                                        </div>
                                    </div>
                                
                                </div>

                                <div className="about skills">
                                    <h2 className="title2">SKILLS</h2>
                                    <br/>
                                        <div style={{display:"flex", marginTop:"1rem", gap:"3px"}}>
                                            <h4 style={{color:"#848c90"}}>Java, </h4>
                                            <h4 style={{color:"#848c90"}}>C#, </h4>
                                            <h4 style={{color:"#848c90"}}>PHP,</h4>
                                            <h4 style={{color:"#848c90"}}>HTML,</h4>
                                            
                                        </div>
                                    </div>    
                                <div className="about interests">
                                    <h2 className="title2">Interests</h2>
                                    <ul>
                                            <li>Fitness</li>
                                            <li>Movies</li>
                                            <li>Music</li>
                                            <li>Programming</li>
                                    </ul>
                                </div>                               
                                </div>
                    </div>
                </div>
                <button className="btn-cv-print" onClick={handlePrint}>Download as PDF</button>
            </div>
    );
}

export default CV;