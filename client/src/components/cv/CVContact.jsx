import React, { useState, useEffect } from "react";
import ContactForm from "./forms/ContactForm";

function CVContact({id, contactData, getContactsData }){

    const[wasClicked, setWasClicked] = useState(false);
    
    function toggleForm(){
        setWasClicked(!wasClicked);
    }
    return(
        wasClicked ? <ContactForm toggleForm={toggleForm} id={id} contactData={contactData} getContactsData={getContactsData}/> : 
        <div className="contactInfo" onClick={toggleForm}>
            <h3 className="title">{contactData[0].title}</h3> 
                <ul>
                    <li>
                        <span className="icon"><i className="fa fa-phone" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].phone}</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].email}</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].user_address}</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-facebook-square" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].facebook}</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-linkedin-square" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].linkedin}</span>    
                    </li>
                    <li>
                        <span className="icon"><i className="fa fa-github" aria-hidden="true"></i></span>
                        <span className="text">{contactData[0].github}</span>    
                    </li>
                </ul>
        </div> 
        
    );
}

export default CVContact;