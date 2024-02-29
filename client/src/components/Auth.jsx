import React, {useState} from "react";
import { useCookies } from "react-cookie";

function Auth(){
    
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    function viewLogin(status){
        setError(null);
        setIsLogin(status);
    }

    async function handleSubmit(event, endpoint){
        console.log(`${process.env.REACT_APP_SERVERURL}/${endpoint}`);
        event.preventDefault();
        if(!isLogin && password !== confirmPassword){
            setError('Passwords do not match!');
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({ email, password })
          });
    

        const data = await response.json();
        if(data.detail){
            setError(data.detail);
        }else{
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);
            window.location.reload();
        }
    }

    return(
        <div className="auth-container">
            <div className="auth-description">
                    <h1>CV-App</h1>
                    <p>Create your cv fast and easy.</p>  
            </div>
            <div className="auth-form-container">
                <form>
                    <h2>{isLogin ? 'Log in!' : 'Register!'}</h2>
                    <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                    <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    {
                       !isLogin && <input type="password" placeholder="Confirm password" onChange={(event) => setConfirmPassword(event.target.value)} />
                    }
                    {
                       error && <p>{ error }</p>
                    }
                    <input type="submit" onClick={(event)=>handleSubmit(event, isLogin ? 'login' : 'signup')} />
                </form>
                    <hr />
                    {
                        isLogin ? <button className="sign-up" onClick={() => viewLogin(false)}>Sign Up!</button> : 
                                  <button className="sign-up" onClick={()=>viewLogin(true)}>Log In!</button>
                    }
                    
            </div>
        </div>
    );
}

export default Auth;