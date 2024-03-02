import React, {  } from "react";
import CVitem from "./CVitem";
import UserProfile from "./UserProfile";

function WorkArea({ section, cvs, setIsCV, setCVid }){
    
    return (
        <div className="workarea-container">
            { section==="Home" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem id={cv.id} key={cv.id} cv_title={cv.cv_title} setIsCV={ setIsCV } setCVid={ setCVid } />)                 
                }
            </div>
            }
            { section==="Profile" && <UserProfile />}
            { section==="CVs" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem id={cv.id} key={cv.id} cv_title={cv.cv_title} setIsCV = { setIsCV } setCVid={ setCVid } />)                 
                }
            </div>
            }
            { section==="Assignments" && <h1>ASSIGNMENTS</h1>}
            { section==="Advertisements" && <h1>ADVERTISEMENTS</h1>}
        </div>
    );
}

export default WorkArea;

