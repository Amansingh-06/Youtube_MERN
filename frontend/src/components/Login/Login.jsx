import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';


function Login() {


    const [loginfield, setLoginField] = useState({ "email": "", "password": "" });

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8200/user/login', loginfield);
            if (response.data.success) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.userId)
                localStorage.setItem('profilepic',response.data.user.profilepic)
                console.log(response.data)
                
                navigate('/')
                window.location.reload()

                
            } else {
                alert("Login Failed")
            }
        } catch (error) {
            console.log('Login failed:', error.message);
        }
    };

  
    const inputhandle = (e, name) => {
        setLoginField({
            ...loginfield,
            [name]: e.target.value
        });
    };

    console.log(loginfield)

    return (
        <div className="login-container">
            <div className="login-box">
                <div className='heading_wrapper'>
                    <YouTubeIcon className='yicon' />
                    <h2> Sign In</h2>
                </div>
                <p>to continue to YouTube</p>
                <input
                    type="email"
                    placeholder="Email or phone"
                    value={loginfield.email}
                    onChange={(e) => inputhandle(e, "email")}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginfield.password}
                    onChange={(e) => inputhandle(e, "password")}
                    className="input-field"
                />
                <div className="button-group">
                    <Link to={"/"}> <button className="cancel-btn" >Cancel</button></Link>
                    <Link to={"/user/signup"}> <button className="signup-btn" >Signup</button></Link>
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
