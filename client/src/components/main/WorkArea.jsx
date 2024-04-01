import React, {  } from "react";
import CVitem from "../cv/CVitem";
import UserProfile from "./UserProfile";

function WorkArea({ section, cvs, setIsCV, setCVid, profileData, getUserCVs, getProfileData, userEmail }){
    console.log(userEmail);
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
            { section==="Advertisements" && <h1>ADVERTISEMENTS</h1>}
        </div>
    );
}

export default WorkArea;

