import React from "react";
import { useCookies } from "react-cookie";
import profilePic from "../../images/Profile.PNG";

function Header(){

    const [cookies, setCookie, removeCookie] = useCookies(null);

    const userEmail = cookies.Email;

    function logOut(){
        removeCookie('Email');
        removeCookie('AuthToken');
    }

    return (
        <div className="header-container">
            <div className="header-profile">
                <img src={profilePic} />
                <div className="header-greeting">
                    <p>Hello there,</p>
                    <h2>John Smith (@ { userEmail } ) </h2>
                </div>
            </div>
            <div>
                <button onClick={()=>logOut()}>Log out</button>
            </div>
        </div>
    );
}

export default Header;