import React, { useState } from "react";
import { useCookies } from "react-cookie";

function CVProfile({profileData}){

    const [cookies] = useCookies(null);
    const userEmail = cookies.Email;

    const [imgUrl, setImageUrl] = useState(profileData[0].profilepicurl);
    const [fullName, setFullName] = useState(profileData[0].first_name + " " + profileData[0].last_name);

    function handleClick(){
        document.querySelector("#openImgUpload").click();
    }

    function changeName(){
        
    }
    
    return(
        <div className="cv-profile">
            <div className="imgBox">
                <img src={imgUrl} alt="profile-picture" onClick={handleClick}/>
                <input id="openImgUpload" type="file" style={{display:"none"}}/>
            </div>
            <h2 onClick={changeName}>{fullName}</h2> 
        </div>
    );
}

export default CVProfile;