import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import CVFullNameForm from "./forms/CVFullNameForm";

function CVProfile({cvProfileData, cvId, getCVProfileData}){

    const [cookies] = useCookies(null);
    const fileRef = useRef(null);

    const[file, setFile] = useState(undefined);
    const[filePerc, setFilePerc] = useState(0);
    const[fileUploadError, setFileUploadError] = useState(false);
    const [fullNameClicked, setFullNameClicked] = useState(false);
    
    function handleFileUpload(file){
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
                    updateDbPicUrl(cvId,downloadURL); 
               })
            });
    }

    async function updateDbPicUrl(id, url){
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/cv/cvprofilepic/${id}`,{
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    picurl: url
                })
            })
            getCVProfileData(cvId);
        }catch(err){
            console.error(err);
        }
    }

    function toggleForm(){
        setFullNameClicked(!fullNameClicked);
    }

    useEffect(()=>{
     if(file){
        handleFileUpload(file);
     }   
    },[file]);
    
    return(
        <div className="cv-profile">
            <div className="imgBox">
                <img src={cvProfileData[0].picurl} alt="profile-picture" onClick={()=>fileRef.current.click()} />
                <input onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} type="file" hidden accept="image/*"/>
            </div>
            {
                fullNameClicked ? <CVFullNameForm toggleForm={toggleForm} cvProfileData={cvProfileData} cvId={cvId} getCVProfileData={getCVProfileData}/> : 
                    <div className="fullName" onClick={toggleForm}>
                        <div className="fullName-name">
                            <h2>{cvProfileData[0].fullname}</h2> 
                        </div>
                        <div className="fullName-buttons">
                            <p className="fullName-cancel" hidden>X</p>
                        </div>
                </div>
            }   
        </div>
    );
}

export default CVProfile;