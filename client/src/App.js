import React, { useState } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import Main from "./components/main/Main";
import CV from "./components/CV";

function App() {

  const[isCV, setIsCV] = useState(false);
  const[cvId, setCVid] = useState(null);
  console.log("IS CV: " + isCV);

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  return (
    <div>
      { !authToken && <Auth />}
      { (authToken && !isCV) ? <Main userEmail={userEmail} authToken={authToken} setIsCV={setIsCV} setCVid={setCVid}/> : <CV setIsCv={setIsCV} id={cvId} />}
    </div>
  );
}

export default App;
