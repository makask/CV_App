import React, { useEffect, useState } from "react";
import CVitem from "../cv/CVitem";
import UserProfile from "./UserProfile";
import Advertisement from "../advertisements/Advertisement";

function WorkArea({ 
    section, 
    cvs, 
    setIsCV, 
    setCVid, 
    profileData, 
    getUserCVs, 
    getProfileData, 
    userEmail, 
    advertisements,
    getUserAdvertisements }){
    
    return (
        <div className="workarea-container">
            { section==="Home" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem id={cv.id} key={cv.id} cv_title={cv.cv_title} setIsCV={ setIsCV } setCVid={ setCVid } getUserCVs={getUserCVs}/>)                 
                }
            </div>
            }
            { section==="Profile" && <UserProfile getProfileData={getProfileData} profileData={ profileData }/>}
            { section==="CVs" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem 
                        id={cv.id} 
                        key={cv.id} 
                        cv_title={cv.cv_title} 
                        setIsCV = { setIsCV } 
                        setCVid={ setCVid } 
                        getUserCVs={getUserCVs} 
                        userEmail={userEmail}
                    />)                
                }
            </div>
            }
            { section==="Assignments" && <h1>ASSIGNMENTS</h1>}
            { section==="Advertisements" && <div className="cv-item-container">
                {
                    advertisements?.map(item => <Advertisement 
                        id={item.id}
                        key={item.id}
                        link={item.link}
                        getUserAdvertisements={getUserAdvertisements}
                        userEmail={userEmail}
                    />)
                }
            </div>
            }
        </div>
    );
}

export default WorkArea;

