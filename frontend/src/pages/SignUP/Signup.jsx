// SignupPage.js
import React, { useState } from 'react';
import './Signupcss.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [profilePic, setProfilePic] = useState('https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg');
    const [inputfield,setinputfield]=useState({"userName":"","email":"","password":"","profilepic":profilePic})

  
    
    const navigate = useNavigate();

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Youtube-clone')
        try {
            
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxbod3fig/image/upload', data)
            const imageurl = response.data.url;
            setProfilePic(imageurl)
            setinputfield({
                ...inputfield, "profilepic": imageurl
            })

        
        } catch (error) {
            console.log(error)

        }
    }

    const handlesignup = (e, name) => {
        setinputfield({
            ...inputfield, [name]: e.target.value
        })

    }

    const handleData = async (e) => {
        e.preventDefault(); // Prevents form submission refresh
        try {
            
            const response = await axios.post('http://localhost:8200/user/signup', inputfield);
            
            window.location.reload();

            navigate('/')

        } catch (error) {
            console.log(error);
            
        }
    };


    return (
        <div className="signupContainer">
            <div className="signupBox">
                <h2 className="signupTitle">Sign Up</h2>
                <form onSubmit={handleData}>
                    <div className="inputWrapper">
                        <label>Username</label>
                        <input
                            type="text"
                            value={inputfield.userName}
                            onChange={(e) => handlesignup(e,"userName")}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Email</label>
                        <input
                            type="email"
                            value={inputfield.email}
                            onChange={(e) => handlesignup(e, "email")}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Password</label>
                        <input
                            type="password"
                            value={inputfield.password}
                            onChange={(e) => handlesignup(e, "password")}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="inputWrapper">
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                        <img src={profilePic} alt="Preview" className="profilePreview" />
                    </div>
                    <div className="buttonGroup">
                        <button type="submit" className="signupBtn">Sign Up</button>
                        <button type="button" className="homeBtn" onClick={() => navigate('/')}>Homepage</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
