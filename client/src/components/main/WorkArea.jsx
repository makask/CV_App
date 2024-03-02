import React, {  } from "react";
import CVitem from "./CVitem";

function WorkArea({ section, cvs }){
    
    return (
        <div className="workarea-container">
            { section==="Home" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem id={cv.id} key={cv.id} cv_title={cv.cv_title}/>)                 
                }
            </div>
            }
            { section==="Profile" && <h1>Profile</h1>}
            { section==="CVs" && <div className="cv-item-container">
                { 
                    cvs?.map(cv => <CVitem id={cv.id} key={cv.id} cv_title={cv.cv_title}/>)                 
                }
            </div>
            }
            { section==="Assignments" && <h1>ASSIGNMENTS</h1>}
            { section==="Advertisements" && <h1>ADVERTISEMENTS</h1>}
        </div>
    );
}

export default WorkArea;

