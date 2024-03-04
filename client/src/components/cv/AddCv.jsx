import React from "react";

function AddCv({ toggleForm }){


    

    return(
        <div className="add-cv-container">
            <form>
                <input ></input>
            </form>
            <div className="add-cv-btns">
                <button>+</button>
                <button onClick={()=>toggleForm()}>x</button>
            </div>
        </div>
    );
}

export default AddCv;

