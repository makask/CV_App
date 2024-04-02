import React, { useState } from "react";
import "./AdvertisementForm.css";

function AdvertisementForm({ toggleForm, id, link, getUserAdvertisements, userEmail }){

    const[linkUrl, setLinkUrl] = useState(link);

    async function editAdvertisement(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/advertisements/${id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    link: linkUrl
                })
            })
            getUserAdvertisements(userEmail);
            toggleForm();
        }catch(err){
            console.error(err);
        }
    }

    function handleChange(event){
        setLinkUrl(event.target.value);
    }

    return(
        <div className="adv-container">
            <div className="adv-item">
                <div className="adv-item-link">
                    <input type="text" placeholder={linkUrl} value={linkUrl} onChange={handleChange}></input>
                </div>
                <div className="adv-item-buttons">
                    <i className="adv-item-form-update-icon fa fa-check-circle-o fa-lg" aria-hidden="true" onClick={editAdvertisement}></i>
                    <h3 onClick={toggleForm}>x</h3>
                </div>
            </div>
        </div>
    )
}

export default AdvertisementForm;
