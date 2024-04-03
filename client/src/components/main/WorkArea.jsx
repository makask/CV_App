import React, { useEffect, useState } from "react";
import CVitem from "../cv/CVitem";
import UserProfile from "./UserProfile";
import Advertisement from "../advertisements/Advertisement";
import Task from "../tasks/Task";
import TaskForm from "../tasks/TaskForm";

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
    getUserAdvertisements,
    tasks,
    getUserTasks
    }){
    
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
            { section==="Assignments" && <div className="cv-item-container">
                {
                    tasks?.map(task => <Task 
                        id={task.id}
                        key={task.id}
                        task={task.task}
                        getUserTasks={getUserTasks}
                        userEmail={userEmail}
                    />)
                }
            </div>
            }
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

