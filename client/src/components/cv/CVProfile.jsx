import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

function CVProfile({cvProfileData, cvId, getCVProfileData}){

    const [cookies] = useCookies(null);
    const fileRef = useRef(null);

    const[file, setFile] = useState(undefined);
    const[filePerc, setFilePerc] = useState(0);
    const[fileUploadError, setFileUploadError] = useState(false);
    
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
            <h2>{cvProfileData[0].fullname}</h2> 
        </div>
    );
}

export default CVProfile;