import React, { useEffect, useState } from 'react';
import './ChannelProfile.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidenav from '../../components/SideNav/Sidenav';

function ChannelProfile({ sidenav }) {
    const [data, setData] = useState([])
    const [channel, setChannel] = useState(null)

    const { id } = useParams()

    const videos = [
        { title: "React Basics", views: "1M views", date: "2 days ago", thumbnail: "https://via.placeholder.com/200" },
        { title: "Advanced JavaScript", views: "500K views", date: "1 week ago", thumbnail: "https://via.placeholder.com/200" },
        { title: "CSS Animations", views: "300K views", date: "3 days ago", thumbnail: "https://via.placeholder.com/200" },
        { title: "HTML Tips", views: "150K views", date: "1 month ago", thumbnail: "https://via.placeholder.com/200" },
        // Add more video objects here as needed
    ];
    const getprofile = async () => {
        try {
            const response = await axios.get(`http://localhost:8200/api/profile/${id}`, { withCredentials: true });

            setData(response?.data?.videos)
            console.log(data)






        } catch (error) {
            console.error('Error fetching videos:', error);
        }


    };

    const getchannelbyuserid = async () => {
        try {
            const channel_response = await axios.get(`http://localhost:8200/create/channel/${id}`, { withCredentials: true });


            setChannel(channel_response?.data?.channel)
            console.log(channel)




        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };


    useEffect(() => {
        getprofile()
        getchannelbyuserid()

    }, [])

    return (
        <div className="channelMain">
            <Sidenav sidenav={sidenav} />
            <div className={sidenav ? "channelProfile" : "smallChannelProfile"}>
                {/* Banner Section */}
                <div className="channelBanner">
                    <img
                        src="https://via.placeholder.com/1200x300"
                        alt="Channel Banner"
                        className="bannerImage"
                    />
                </div>

                {/* Channel Info Section */}
                <div className="channelInfo">
                    <img
                        src={channel?.profilePic}
                        alt="Channel Profile"
                        className="channelProfilePic"
                    />
                    <div className="channelDetails">
                        <h2 className="channelName">{channel?.channelName}</h2>
                        <p className="channelSubscribers">1.2M subscribers</p>
                    </div>
                    <button className="subscribeButton">Subscribe</button>
                </div>

                {/* Video Grid Section */}
                <div className="videosSection">
                    <h3>Uploads</h3>
                    <div className="videoGrid">
                        {data.map((video, index) => (
                            <Link to={`/watch/${video._id}`}>
                                <div key={index} className="videoCard">
                                    <img src={video.thumbnail} alt="Thumbnail" className="videoThumbnail" />
                                    <div className="videoInfo">
                                        <p className="videoTitle">{video.title}</p>
                                        <p className="videoViewsDate"> {video.createdAt.split(0,10)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
}

export default ChannelProfile;
