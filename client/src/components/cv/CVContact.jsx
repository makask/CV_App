import React, { useState } from "react";
import ContactForm from "./forms/ContactForm";

function CVContact(){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    return(
        wasClicked ? <ContactForm toggleForm={toggleForm}/> : 
        <div className="contactInfo" onClick={toggleForm}>
            <h3 className="title">Kontakt</h3> 
                <ul>
                    <li>
                        <span className="icon"><i className="fa fa-phone" aria-hidden="true"></i></span>
                        <span className="text">+372 53 406 754</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                        <span className="text">kaskmarko@gmail.com</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                        <span className="text">J.Vilmsi 60-12, 10115, Tallinn, Estonia</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-facebook-square" aria-hidden="true"></i></span>
                        <span className="text">www.facebook.com/kaskmarko</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-linkedin-square" aria-hidden="true"></i></span>
                        <span className="text">linkedin.com/in/marko-kask-a39a3a255</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-github" aria-hidden="true"></i></span>
                        <span className="text">https://github.com/makask</span>    
                    </li>
                </ul>
        </div> 
        
    );
}

export default CVContact;