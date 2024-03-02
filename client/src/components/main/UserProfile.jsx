import React from "react";
import { useCookies } from "react-cookie";
import profilePic from "../../images/Profile.PNG";



function UserProfile(){

    const [cookies] = useCookies(null);
    const userEmail = cookies.Email;

    return (
        <div className="profile-container">
            <div>
                <img src={profilePic} />
            </div>
            <form> 
                <div className="pr-img">
                    <p>Image: </p>
                    <input type="file"></input>
                </div> 
                <div className="pr-name">
                    <p>First Name:</p>
                    <input type="text" placeholder="First Name" name="fName"/>
                    <p>Last Name:</p>
                    <input type="text" placeholder="Last Name" name="lName"/>
                </div>
                <div className="pr-button">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

export default UserProfile;




