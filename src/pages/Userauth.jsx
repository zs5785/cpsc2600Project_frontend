import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Userauth(props){

    const auth = useAuth();
    const navigate = useNavigate();
    const {isSignup} = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function ChangeUsername(e){
        setUsername(e.target.value);
    }

    function ChangePassword(e){
        setPassword(e.target.value);
    }

    function ChangeConfirmPassword(e){
        setConfirmPassword(e.target.value);
    }

    function HandleSubmit(e){
        e.preventDefault();

        if (!username){
            setErrorMessage('Empty Username');
            return;
        }

        if (!password){
            setErrorMessage('Empty Password');
            return;
        }

        const inputData = {
            username: username,
            password: password
        };

        const startSession = (response)=>{
            if (response.data){
                auth.login(response.data);
                navigate('/');
                return;
            }
            setErrorMessage(response.message);
        };


        if (isSignup){
            
            if (password !== confirmPassword){
                setErrorMessage('Passwords are not equal');
                return;
            }

            axios.post(import.meta.env.VITE_SERVER_URL + "/user/signup", inputData)
                .then(startSession)
                .catch((reason)=>{
                    setErrorMessage(reason.response.data.message);
                });
        }
        else{
            axios.post(import.meta.env.VITE_SERVER_URL + "/user/login", inputData)
                .then(startSession)
                .catch((reason)=>{
                    setErrorMessage(reason.response.data.message);
                });
        }
    }

    useEffect(()=>{
        if (auth.user){
            navigate('/');
        }
    },[auth]);

    return (
        <div>
            <h2>{isSignup ? "Sign Up" : "Login"}</h2>
            <form className="container form-container" onSubmit={HandleSubmit}>
                <label>Username
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        onChange={ChangeUsername}
                        required 
                    />
                </label>

                <label>Password
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        onChange={ChangePassword}
                        required 
                    />
                </label>

                {
                    isSignup
                    &&
                    <label>Confirm Password
                        <input 
                            type="password" 
                            name="password-2" 
                            id="password-2" 
                            onChange={ChangeConfirmPassword}
                            required 
                        />
                    </label>
                }

                <div className="gap"></div>
                <input className='big-font clickable' type="submit" name={isSignup ? "signup" : "login"} value={isSignup ? "Sign Up" : "Login"} />
                <div className='error-container'>{errorMessage}</div>
            </form>
        </div>
    );
}

export default Userauth;