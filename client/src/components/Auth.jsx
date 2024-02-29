import React, {useState} from "react";

function Auth(){

    const [isLogin, setIsLogin] = useState(true);

    return(
        <div className="auth-container">
            <div className="auth-description">
                    <h1>CV-App</h1>
                    <p>Create your cv fast and easy.</p>  
            </div>
            <div className="auth-form-container">
                <form>
                    <h2>{isLogin ? 'Log in!' : 'Register!'}</h2>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm password" />
                    <p>Error message here</p>
                    <input type="submit" />
                </form>
                    <hr />
                    <button className="sign-up">Sign Up!</button>
            </div>
        </div>
    );
}

export default Auth;