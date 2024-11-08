import React, { useEffect, useState } from 'react'
import '../HomePage/Homecss.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home({ sidenav,search }) {

    const [activebtn, setActivebtn] = useState(0)
    const navigate = useNavigate();

    
    function handleactivebtn(index) {  //function for active tab
        setActivebtn(index)
    }

    let homepagetab = [
        "All", "Cricket", "News", "Bollywood", "Arijit Singh", "Movie", "Game", "Music", "Live", "Bhojpuri", "Mixes", "Gulshan Kumar", "Diwali", "Song"
    ];

    const [data, setData] = useState([]);

    const getAllVideo = async () => {
        try {
            const response = await axios.get('http://localhost:8200/api/video', { withCredentials: true });

            setData(response.data.videos)
            console.log(data)

        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getAllVideo()
    }, [])
    console.log(data);
    const filteredVideos = data.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className='HomeMain'>

                <div className={sidenav ? "Home_wrapper" : "sideHome"}>
                    <div className='tab_wrapper'>
                        {homepagetab.map((tab, index) => {
                            return (
                                <div>
                                    <button className='tab_btn' onClick={() => handleactivebtn(index)}
                                        style={{
                                            backgroundColor: activebtn === index ? 'black' : 'gainsboro',
                                            color: activebtn === index ? 'white' : 'black',
                                        }}
                                    >{tab}</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='videoPage'>

                        {filteredVideos.map((video, index) => {
                            return (
                                <Link to={`/watch/${video._id}`} className='link'>
                                    <div className={sidenav ? 'video_card' : "sideVideo"}>

                                        <div className='image_wrapper'>
                                            <img src={video.thumbnail} alt="thumbnail" className='thumbnail' />
                                        </div>
                                        <div className='title_wrapper'>
                                            <Link to={`/user/${video.user._id}`}>  <img src={video.channel?.profilePic} alt="channel" className='channelpic' /></Link>
                                            <h3>{video.title}</h3>
                                        </div>
                                        <div className='view_wrapper'>
                                            <p>{video.channel?.channelName}</p>
                                            <p className='views'>13M views</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}


                    </div>
                </div>
            </div>

        </>
    )
}

export default Home