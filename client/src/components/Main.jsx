import React from "react";
import { useCookies } from "react-cookie";

function Main(){

    const [cookies, setCookie, removeCookie] = useCookies(null);

    function logOut(){
        removeCookie('Email');
        removeCookie('AuthToken');
    }

    return(
        <div>
            <button onClick={()=>logOut()}>Log out</button>
        </div>
    );
}

export default Main;