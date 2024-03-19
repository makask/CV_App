import React, {useState} from "react";

function CVLanguagesTitle(){

    const[onHover, setOnHover] = useState(false);

    function mouseEnter(){
        setOnHover(true);
    }

    function mouseLeave(){
        setOnHover(false);
    }

    return(
        <div className="contactInfo-title" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <h3 className="title">Languages</h3>
            {
                onHover && <h2 className="add-school">+</h2>
            }
            
        </div>
    );
}

export default CVLanguagesTitle;