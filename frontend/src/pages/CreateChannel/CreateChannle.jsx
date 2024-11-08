import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './CreateChannel.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
function CreateChannel() {
    const [profilePic, setProfilePic] = useState("https://tse4.mm.bing.net/th?id=OIP.xo-BCC1ZKFpLL65D93eHcgHaGe&pid=Api&P=0&h=180");
    const [createinputfield, setcreatefield] = useState({ "channelName": "", "userName": "", "profilePic": profilePic })
    const [loader,setloader]=useState(false)
    
    const navigate = useNavigate();
    
    

   

    const handlecreateChannel = (e, name) => {
        setcreatefield({
            ...createinputfield, [name]: e.target.value
        })

    }
    

    const uploadImage = async (e) => {
        setloader(true)
        const files = e.target.files;
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Youtube-clone')
        try {
           
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxbod3fig/image/upload', data)
            const imageurl = response.data.url;
            setProfilePic(imageurl)
            setcreatefield({
                ...createinputfield, "profilepic": imageurl
            })
setloader(false)
            
        } catch (error) {
            console.log(error)

        }
    }
    const handleData = async (e) => {
        e.preventDefault(); // Prevent form submission refresh
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (!token) {
            console.log("User not authenticated");
            return; // Optionally redirect to login or show an error
        }

        try {
            const response = axios.post('http://localhost:8200/create/channel',createinputfield
            , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert("channel Created")
                    
                    navigate('/')
                    window.location.reload()
                })
                .catch(error => {
                    if (error.response) {
                        console.error("Backend Error Response:", error.response.data); // Log backend error
                    } else {
                        console.error("Frontend Error:", error.message); // Log frontend error
                    }
                });


            
            
            // navigate('/'); // Redirect after successful channel creation
        } catch (error) {
            console.log(error);
        }
    };

    

    

    return (
        <div className="createChannelPage">
            <div className="createChannelContainer">
                <h2 className="createChannelTitle">Create Your Channel</h2>

                {/* Profile Picture Section */}
                <div className="profilePicSection">
                    <label htmlFor="profilePic" className="profilePicLabel">
                        <img
                            src={profilePic}
                            alt="Profile"
                            className="profilePic"
                        />
                        <input
                            type="file"
                            id="profilePic"
                            className="fileInput"
                            accept="image/*"
                            onChange={uploadImage}
                        />
                    </label>
                    <p className="uploadText">Click to upload profile picture</p>
                </div>

                {/* Username Section */}
                <div className="formGroup">
                    <label htmlFor="username" className="formLabel">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="formInput"
                        placeholder="Enter your username"
                        value={createinputfield.userName}
                        onChange={(e) => { handlecreateChannel(e, "userName") }}
                    />
                </div>

                {/* Channel Name Section */}
                <div className="formGroup">
                    <label htmlFor="channelName" className="formLabel">Channel Name</label>
                    <input
                        type="text"
                        id="channelName"
                        className="formInput"
                        placeholder="Enter your channel name"
                        value={createinputfield.channelName}
                        onChange={(e) => { handlecreateChannel(e, "channelName") }}
                    />
                </div>

                {/* Terms & Policy Section */}
                <div className="termsSection">
                    <p className="termsText">
                        By creating your channel, you agree to our <span className="termsLink">Terms of Service</span> and <span className="termsLink">Privacy Policy</span>.
                    </p>
                </div>

                {/* Button Section */}
                <div className="buttonGroup">
                    <button onClick={handleData} className="createChannelBtn" >
                        Create Channel
                    </button>
                    <Link className='cancelBtn' to={'/'}> 
                        <button >
                        Cancel
                        </button>
                        </Link>
                </div>
                {loader && <Box sx={{ width: '100%', marginTop:"10px" }}>
                    <LinearProgress />
                </Box>}
            </div>
        </div>
    );
}

export default CreateChannel;
