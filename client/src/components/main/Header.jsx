import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import profilePic from "../../images/Profile.jpg";

function Header({ profileData }){

    const [cookies, setCookie, removeCookie] = useCookies(null);
    
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;

    function logOut(){
        removeCookie('Email');
        removeCookie('AuthToken');
    }

   
    return (
        <div className="header-container">
            <div className="header-profile">
                <img src={ profileData[0].profilepicurl }/>
                <div className="header-greeting"> 
                    <h4>Hello there, {profileData[0].first_name} {profileData[0].last_name} (@ {profileData[0].email})</h4>    
                </div>
            </div>
            <div>
                <button onClick={()=>logOut()}>Log out</button>
            </div>
        </div>
    );
}

export default Header;

