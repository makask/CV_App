import React from "react";
import { useCookies } from "react-cookie";

function Header(){

    const [cookies, setCookie, removeCookie] = useCookies(null);

    function logOut(){
        removeCookie('Email');
        removeCookie('AuthToken');
    }

    return (
        <div className="header-container">
            <h1>Header</h1>
            <button onClick={()=>logOut()}>Log out</button>
        </div>
    );
}

export default Header;