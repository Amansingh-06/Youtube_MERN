import React, { useEffect, useState } from 'react';
import './videocss.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import Sidenav from '../../components/SideNav/Sidenav';

function Video({sidenav}) {
    const [isCommenting, setIsCommenting] = useState(false);
    const [textareafiel, settextareafield] = useState({ "comment": "" })
    const [data, setData] = useState(null);
    const [videourl, setvideoUrl] = useState('')
    const [comment, setComment] = useState([])
    const { id } = useParams()

    const handleCommentInputClick = () => {
        setIsCommenting(true);
    };
    const handleCancelComment = () => {
        setIsCommenting(false);

    };
    const handletextfield = (e, name) => {
        settextareafield({
            ...textareafiel, [name]: e.target.value
        })
    }

    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:8200/api/video/${id}`);

            setData(response.data?.video);
            setvideoUrl(response.data?.video?.videolink);

            console.log("Response:", response);  // Log the full response
        } catch (err) {
            console.log(err);
        }
    };

    // Log `videourl` whenever it changes
    useEffect(() => {
        console.log("Updated videourl:", videourl);
    }, [videourl]);

  

    const fetchcommentById = async () => {
        try {
            const commentRes = await axios.get(`http://localhost:8200/video/comment/${id}`)

            setComment(commentRes?.data?.comments)

         


        } catch (err) {
            console.log(err)
        }
    }
    console.log(data)

    const addComment = async () => {
        try {
            const commentData = { message: textareafiel.comment };  // Ensure you're sending the correct format
            const commentRes = await axios.post(`http://localhost:8200/video/addcomment/${id}`, commentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`  // Send token if needed
                }
            });
    
            if (commentRes.data.success) {
                // Add the new comment to the state directly without needing to refetch
                setComment([...comment, commentRes.data.comment]);
                settextareafield({ comment: "" });  // Clear the input field after posting
                setIsCommenting(false);  // Hide the buttons after posting
            } else {
                console.log('Failed to add comment:', commentRes.data.msg);
            }
        } catch (err) {
            console.log('Error adding comment:', err);
        }
    };



    useEffect(() => {
        fetchVideoById();
        fetchcommentById()
    }, [])

    

    return (
        <>
            <Sidenav sidenav={sidenav}/>
        <div className='videoPage'>
            
            <div className='videoSection'>
                <div className='videoMain'>
                        <div className='videoPlayer'>
                            {console.log(videourl)}
                            <video controls className='mainVideo'>
                                {console.log("ff",videourl)}
                                <source src={videourl} type="video/mp4" />
                        </video>
                    </div>
                    <h3 className='videoTitle'>{data?.title}</h3>
                    <div className='videoDetails'>
                        <p className='viewCount'>1.5M views • {data?.createdAt.slice(0, 10)}</p>
                    </div>
                    <div className='channelInfo'>
                        <div className='channelDetails'>
                                <Link to={`/user/${data?.user?._id}`}>   <img className='channelImage' src={data?.user?.profilepic} alt='Channel' /></Link>
                            <p className='channelName'>{data?.channel?.channelName}</p>
                        </div>
                        <button className='subscribeBtn'>{data?.channel?.channelName}</button>
                        <div className='likesection'>
                            <div className='likeCount'>
                                <ThumbUpOutlinedIcon />
                                <p>{data?.like}</p>
                            </div>

                            <ThumbDownOutlinedIcon />
                        </div>
                    </div>
                    <div className='videoDescription'>
                        <p className='descriptionText'>
                            {data?.description}
                        </p>
                    </div>
                </div>
                <div className='ChannelSection'>
                    <textarea
                        className='commentInput'
                        placeholder='Write a comment...'
                        value={textareafiel.comment}
                        onChange={(e) => { handletextfield(e, "comment") }}

                        onClick={handleCommentInputClick}  // Handle click on textarea
                    />
                </div>
                <div className={isCommenting ? "button" : "hidebtn"}>
                    <button onClick={handleCancelComment} className='cancelBtn'>Cancel</button>
                    <button onClick={addComment} className='postBtn'>Post</button>
                </div>

                <div className='commentSection'>
                    <h4> {comment?.length} Comments</h4>

                    {comment?.map((com, index) => {
                        return (
                            <div key={index} className='commentsList'>
                                <div className='channel_Wrapper'>
                                    <div className='comment_Channel'>
                                        <div className='commentProfile'>
                                            <img src={com?.user.profilepic} alt="user" className='commentProfilepic' />
                                        </div>
                                        <div className='channelName'>
                                            <p>{com?.user?.userName}</p>
                                            <p>{com.createdAt.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className='userConnect'>
                                        <p>{com.message}</p>
                                        <div className='delcomment'>
                                            <button>edit</button>
                                            <button>delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>

            {/* Suggested Videos Section */}
            <div className='suggestedVideos'>
                <h4>Suggested Videos</h4>
                <div className='suggestedVideo'>
                    <img src="https://via.placeholder.com/120" alt="Thumbnail" className="suggestedThumbnail" />
                    <div className="suggestedDetails">
                        <p className="suggestedTitle">Understanding React Basics</p>
                        <p className="suggestedChannel">React Dev</p>
                        <p className="suggestedInfo">200K views • 1 week ago</p>
                    </div>
                </div>
                <div className='suggestedVideo'>
                    <img src="https://via.placeholder.com/120" alt="Thumbnail" className="suggestedThumbnail" />
                    <div className="suggestedDetails">
                        <p className="suggestedTitle">JavaScript for Beginners</p>
                        <p className="suggestedChannel">Code Academy</p>
                        <p className="suggestedInfo">300K views • 3 days ago</p>
                    </div>
                </div>
                <div className='suggestedVideo'>
                    <img src="https://via.placeholder.com/120" alt="Thumbnail" className="suggestedThumbnail" />
                    <div className="suggestedDetails">
                        <p className="suggestedTitle">CSS Flexbox Explained</p>
                        <p className="suggestedChannel">Design Dev</p>
                        <p className="suggestedInfo">150K views • 5 days ago</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Video;
