import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
import Main from "./components/main/Main";

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  
  return (
    <div>
      { !authToken && <Auth />}
      { authToken && <Main userEmail={userEmail} authToken={authToken} />}
    </div>
  );
}

export default App;
