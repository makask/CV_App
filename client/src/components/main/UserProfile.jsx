import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function UserProfile({ profileData, getProfileData }){

    const [cookies] = useCookies(null);
    const userEmail = cookies.Email;
    const [imageUrl, setImageUrl] = useState(profileData[0].profilepicurl);
    const[profile, setProfile] = useState({
        fName: profileData[0].first_name,
        lName: profileData[0].last_name
    });

    function handleChange(event){
        const { name, value } = event.target;
        setProfile((prevValue) => {
            return {
                ...prevValue,
                [name]:value
            }
        });
    }

    function handleUrlChange(event){
        document.querySelector("#picUrl").value = event.target.value
        document.querySelector("#profile-img").src = event.target.value;
        setImageUrl(event.target.value);
    }

    async function fileSelectedHandler(event){
        let result = "";
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.addEventListener( "load", async () => {
            // convert image file to base64 string
            result = reader.result;
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/uploadImage`,{
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ result })
              });             
              const url = await response.json();
              const updatedUrl = url.url;
              document.querySelector("#picUrl").value =  updatedUrl;
              document.querySelector("#profile-img").src = updatedUrl;
              setImageUrl(updatedUrl);
        },
        false,
        );
        
        if (file) {
            reader.readAsDataURL(file);
        }  
        return result;
    }
    
    async function editData(event){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/profile/${userEmail}`, {
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    first_name : profile.fName,
                    last_name : profile.lName,
                    profilepicurl : imageUrl
                })
            });
            if(response.status === 200){
                getProfileData(userEmail);
            }
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="profile-container">
            <div>
                <img id="profile-img" src={ profileData[0].profilepicurl } /> 
            </div>
            <form> 
                <div className="pr-img">
                    <p>Image: </p>
                    {

                    }
                    <input type="file" onChange={fileSelectedHandler} />
                </div> 
                <div className="pr-url">
                    <p>Image URL: </p>
                    <input id="picUrl" name="picUrl" value={imageUrl} onChange={handleUrlChange} />
                </div>
                <div className="pr-name">
                    <p>First Name:</p>
                    <input type="text" name="fName" value={profile.fName} onChange={handleChange}/>
                    <p>Last Name:</p>
                    <input type="text" name="lName" value={profile.lName} onChange={handleChange}/>
                </div>
                <div className="pr-button">
                    <input type="submit" onClick={(event) => editData(event)}/>
                </div>
            </form>
        </div>
    );
}

export default UserProfile;




