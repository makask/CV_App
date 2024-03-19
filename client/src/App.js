import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import Main from "./components/main/Main";
import CV from "./components/cv/CV";

function App() {
  
  const[isCV, setIsCV] = useState(false);
  const[cvId, setCVid] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const[profileData, setProfileData] = useState(null);
  
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  async function getProfileData(userEmail){
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/profile/${userEmail}`);
        const json = await response.json();
        setProfileData(json);
    }catch(err){
        console.error(err);
    }
  }

  return (
    <div> 
          { !authToken && <Auth />}
          { (authToken && !isCV) && 
            <Main 
              profileData={profileData} 
              getProfileData={getProfileData} 
              setProfileData={setProfileData} 
              userEmail={userEmail} 
              authToken={authToken} 
              cvId={cvId}
              setIsCV={setIsCV} 
              setCVid={setCVid} 

          />}
          { (authToken && isCV) && 
            <CV 
              profileData={profileData} 
              getProfileData={getProfileData} 
              setProfileData={setProfileData} 
              setIsCv={setIsCV} 
              id={cvId} 
              setCVid={setCVid} 
          />}
    </div>
  );
}

export default App;
