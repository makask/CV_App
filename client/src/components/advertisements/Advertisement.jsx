import React, { useState } from "react";
import "./Advertisement.css";
import AdvertisementForm from "./AdvertisementForm";

function Advertisement({ id, link, getUserAdvertisements, userEmail }){

    const[wasClicked, setWasClicked] = useState(false);

    function toggleForm(){
        setWasClicked(!wasClicked);
    }

    async function deleteAdvertisement(){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/advertisements/${id}`, {
                method: 'DELETE'
            });
            if(response.status === 200){
                getUserAdvertisements(userEmail);
            }
        }catch(err){
            console.error(err);
        }
    }

    return(
        wasClicked ? <AdvertisementForm toggleForm={toggleForm} id={id} link={link} getUserAdvertisements={getUserAdvertisements} userEmail={userEmail}/> : 
        <div className="adv-container">
            <div className="adv-item">
                <div className="adv-item-link">
                    <a href={link}>{link}</a>
                </div>
                <div className="adv-item-buttons">
                    <i onClick={toggleForm} class="adv-item-edit-icon fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i className="adv-item-delete-icon fa fa-trash" aria-hidden="true" onClick={deleteAdvertisement}></i>
                </div>
            </div>
        </div>
    )
}

export default Advertisement;