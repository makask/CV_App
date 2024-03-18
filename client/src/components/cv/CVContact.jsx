import React from "react";

function CVContact(){

    

    return(
        <div className="contactInfo">
            <h3 class="title">Kontakt</h3>
                <ul>
                    <li>
                        <span class="icon"><i class="fa fa-phone" aria-hidden="true"></i></span>
                        <span class="text">+372 53 406 754</span>    
                    </li>
                    <li>
                        <span class="icon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
                        <span class="text">kaskmarko@gmail.com</span>    
                    </li>
                    <li>
                        <span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                        <span class="text">J.Vilmsi 60-12, 10115, Tallinn, Estonia</span>    
                    </li>
                    <li>
                        <span class="icon"><i class="fa fa-facebook-square" aria-hidden="true"></i></span>
                        <span class="text">www.facebook.com/kaskmarko</span>    
                    </li>
                    <li>
                        <span class="icon"><i class="fa fa-linkedin-square" aria-hidden="true"></i></span>
                        <span class="text">linkedin.com/in/marko-kask-a39a3a255</span>    
                    </li>
                    <li>
                        <span class="icon"><i class="fa fa-github" aria-hidden="true"></i></span>
                        <span class="text">https://github.com/makask</span>    
                    </li>
                </ul>
        </div>
    );
}

export default CVContact;