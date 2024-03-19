import React from "react";
import './ContactForm.css';


function ContactForm({ toggleForm }){

    return(
        <div className="contactInfo-form-div">
            <form className="contactInfo-form">
                <h3 className="title"><input type="text" name="title" placeholder="KONTAKT"></input><span onClick={toggleForm} className="cancel">x</span></h3>
                    <ul>
                        <li>
                            <span className="icon"><i className="fa fa-phone" aria-hidden="true"></i></span>
                            <span className="text"><input name="phone" type="text" placeholder="+372 53 406 754"></input></span>    
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                            <span className="text"><input type="text" placeholder="kaskmarko@gmail.com"></input></span>    
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                            <span className="text"><input type="text" placeholder="J.Vilmsi 60-12, 10115, Tallinn, Estonia"></input></span>    
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-facebook-square" aria-hidden="true"></i></span>
                            <span className="text"><input type="text" placeholder="www.facebook.com/kaskmarko"></input></span>    
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-linkedin-square" aria-hidden="true"></i></span>
                            <span className="text"><input type="text" placeholder="linkedin.com/in/marko-kask-a39a3a255"></input></span>    
                        </li>
                        <li>
                            <span className="icon"><i className="fa fa-github" aria-hidden="true"></i></span>
                            <span className="text"><input type="text" placeholder="https://github.com/makask"></input></span>
                            <span className="contactInfo-save-form"><i className="fa fa-check-circle-o fa-lg" aria-hidden="true"></i></span>    
                        </li>
                    </ul>
            </form>
        </div> 
    )
}

export default ContactForm;

