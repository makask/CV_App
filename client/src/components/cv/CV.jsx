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
import CVWorkExperienceTitle from "./CVWorkExperienceTitle";
import CVSkillsTitle from "./CVSkillsTitle";
import CVWorkExpItem from "./CVWorkExpItem";
import CVSkills from "./CVSkills";
import CVHobbiesTitle from "./CVHobbiesTitle";
import CVHobbiesItem from "./CVHobbiesItem";
import './CV.css';

import { useReactToPrint } from 'react-to-print';


function CV({ setIsCv,  setCVid, id }){

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
    const[workExperienceTitle, setWorkExperienceTitle] = useState(null);
    const[skillsTitle, setSkillsTitle] = useState(null);
    const[skills, setSkills] = useState(null);
    const[hobbiesTitle, setHobbiesTitle] = useState(null);
    const[workItems, setWorkItems] = useState(null);
    const[hobbies, setHobbies] = useState(null);

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

    async function getWorkExperienceTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperiencetitle/${id}`);
            const json = await response.json();
            setWorkExperienceTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getWorkItems(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/workexperience/${id}`);
            const json = await response.json();
            setWorkItems(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getSkillsTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/skillstitle/${id}`);
            const json = await response.json();
            setSkillsTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getSkills(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/skills/${id}`);
            const json = await response.json();
            setSkills(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getHobbiesTitle(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbiestitle/${id}`);
            const json = await response.json();
            setHobbiesTitle(json);
        }catch(err){
            console.error(err);
        }
    }

    async function getHobbies(id){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/hobbies/${id}`);
            const json = await response.json();
            setHobbies(json);
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
        getWorkExperienceTitle(id);
        getSkillsTitle(id);
        getSkills(id);
        getHobbiesTitle(id);
        getWorkItems(id);
        getHobbies(id);
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
                                {
                                    workExperienceTitle?.map(title => <CVWorkExperienceTitle 
                                        key={title.id}
                                        cvId={id}
                                        workExperienceTitle={workExperienceTitle}
                                        getWorkExperienceTitle={getWorkExperienceTitle}
                                        getWorkItems={getWorkItems}
                                    />)
                                }
                                {
                                    workItems?.map(item => <CVWorkExpItem 
                                        key={item.id}
                                        id={item.id}
                                        cvId={id}
                                        workItems={workItems}
                                        getWorkItems={getWorkItems}
                                        working_period = {item.working_period}
                                        profession = {item.profession}
                                        company = {item.company}
                                        job_description = {item.job_description}
                                    />)
                                }  
                                {
                                    skillsTitle?.map(title => <CVSkillsTitle 
                                        key={title.id}
                                        cvId={id}
                                        skillsTitle={skillsTitle}
                                        getSkillsTitle={getSkillsTitle}
                                    />)
                                }
                                {
                                    skills?.map(item => <CVSkills 
                                        key={item.id}
                                        cvId={id}
                                        skills={skills}
                                        getSkills={getSkills}
                                    />)
                                }
                                {
                                    hobbiesTitle?.map(title => <CVHobbiesTitle 
                                        key={title.id}
                                        cvId={id}
                                        hobbiesTitle={hobbiesTitle}
                                        getHobbiesTitle={getHobbiesTitle}
                                        getHobbies={getHobbies}
                                    />)
                                }
                                <div className="hobbies-container">
                                    {
                                        hobbies?.map(hobbie => <CVHobbiesItem 
                                            key={hobbie.id}
                                            id={hobbie.id}
                                            cvId={id}
                                            hobbie={hobbie.hobbie}
                                            getHobbies={getHobbies}
                                        />)
                                    }              
                                </div>
                            </div>
                    </div>
                </div>
                <button className="btn-cv-print" onClick={handlePrint}>Download as PDF</button>
            </div>
    );
}

export default CV;