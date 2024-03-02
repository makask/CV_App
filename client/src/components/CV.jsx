import React from "react";

function CV({ setIsCv, id }){

    function handleClick(){
        setIsCv(false);
    }

    return (
        <div>
            <h1>CV test page</h1>
            <h1>Id: {id}</h1>
            <button onClick={handleClick}>Go Back</button>
        </div>
    );
}

export default CV;