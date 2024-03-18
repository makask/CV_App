import React from "react";
import './ContactForm.css';


function ContactForm(){

    return(
        <div className="contact-form">
            <form>
                <input type="text" name="title"/>
                <input type="text" name="phone"/>
                <input type="text" name="email"/>
                <input type="text" name="user_address"/>
                <input type="text" name="facebook"/>
                <input type="text" name="linkedin"/>
                <input type="text" name="github"/>
            </form>
        </div>
    )
}

export default ContactForm;

