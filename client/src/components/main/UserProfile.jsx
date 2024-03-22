import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";


function UserProfile({ profileData, getProfileData }){

    const fileRef = useRef(null);
    const [cookies] = useCookies(null);
    const userEmail = cookies.Email;

    const [imageUrl, setImageUrl] = useState(profileData[0].profilepicurl);
    const[profile, setProfile] = useState({
        fName: profileData[0].first_name,
        lName: profileData[0].last_name
    });

    const[file, setFile] = useState(undefined);
    const[filePerc, setFilePerc] = useState(0);
    const[fileUploadError, setFileUploadError] = useState(false);

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

    async function handleFileUpload(file){
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  updateDbPicUrl(userEmail, downloadURL);
                  setImageUrl(downloadURL);
               })
            });
    }

    async function updateDbPicUrl(email, url){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/profilepic/${email}`,{
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    profilepicurl: url
                })
            })
            getProfileData(userEmail);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        if(file){
            handleFileUpload(file);
        }
    },[file]);

    
    async function editData(event){
        event.preventDefault();
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
                <img id="profile-img" onClick={()=>fileRef.current.click()} src={ profileData[0].profilepicurl } /> 
            </div>
            <form> 
                <div className="pr-img">
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} hidden accept='image/*'/>
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




