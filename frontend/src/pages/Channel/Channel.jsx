import React, { useState } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Channelcss.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Channel() {
    const [thumbnail, setThumbnail] = useState('https://tse4.mm.bing.net/th?id=OIP.hhqab-_voCR-IcizNa1MKwHaG8&pid=Api&P=0&h=180');
    const [videoFile, setVideoFile] = useState(null);
    const [inputField, setInputField] = useState({ title: "", description: "", category: "", thumbnail, videolink: videoFile });
    const [loader,setloader]=useState(false)
    const navigate = useNavigate();

    const handleThumbnailChange = async (event) => {
        setloader(true);
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Youtube-clone');
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxbod3fig/image/upload', data);
            const imageUrl = response.data.url;
            setThumbnail(imageUrl);
            setInputField({
                ...inputField, thumbnail: imageUrl
            });
            setloader(false)
        } catch (error) {
            console.error("Thumbnail upload error:", error);
        }
    };

    const handleVideoChange = async (event) => {
        setloader(true)
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Youtube-clone');
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxbod3fig/video/upload', data);
            const videoUrl = response.data.url;
            setVideoFile(videoUrl);
            setInputField({
                ...inputField, videolink: videoUrl
            });
            setloader(false)
        } catch (error) {
            console.error("Video upload error:", error);
        }
    };

    const handleInputField = (e, name) => {
        setInputField({
            ...inputField, [name]: e.target.value
        });
    };

    const handleData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8200/api/uploadVideo`,
                inputField,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            window.location.reload()

            navigate('/');
        } catch (error) {
            console.error("Error uploading video:", error.response?.data || error.message);
        }
    };
console.log(inputField)
    return (
        <div className="createChannelPage">
            <div className='heading_Wrapper'>
                <YouTubeIcon className='youtubeicon'/>
                <h2 className='headingText'>Upload Video</h2>
            </div>
            <form onSubmit={handleData} className="uploadForm">
                <div className="formGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={inputField.title}
                        onChange={(e) => handleInputField(e, "title")}
                        placeholder="Enter video title"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={inputField.description}
                        onChange={(e) => handleInputField(e, "description")}
                        placeholder="Enter video description"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={inputField.category}
                        onChange={(e) => handleInputField(e, "category")}
                        placeholder="Enter video category"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="thumbnail">Upload Thumbnail</label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        required
                    />
                    <div className="thumbnailPreview">
                        <img src={thumbnail} alt="Thumbnail preview" className="thumbnailPreviewimg" />
                    </div>
                </div>

                <div className="formGroup">
                    <label htmlFor="videoFile">Upload Video</label>
                    <input
                        type="file"
                        id="videoFile"
                        accept="video/*"
                        onChange={handleVideoChange}
                        required
                    />
                </div>

                <div className="buttonGroup">
                    <button type="submit" className="submitButton">Upload</button>
                    <button type="button" className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
            {loader && <Box sx={{ width: '100%', marginTop: "10px" }}>
                <LinearProgress />
            </Box>}
        </div>
    );
}

export default Channel;
