import React, { useState,useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './navcss.css'
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';



function Nav({ sidenav, setShowSidenav,setsearch}) {
    
   const [isLogged,setisLogged]=useState(false)
    const [userDropDown, setuserDropDown] = useState(false)
    const [videooption, setvideooption] = useState(false)
    const [profilepic, setprofilepic] = useState('https://tse3.mm.bing.net/th?id=OIP.zc3XRPZxUt4Xt7zDZYLa_wHaHa&pid=Api&P=0&h=180')
    const [hasChannel, setHasChannel] = useState(null);  // State to store whether the user has a channel
    const [inputvalue,setinputvalue]=useState('')
   
  

   

    const navigate = useNavigate();
   
    const handleProfiledropDown = () => {
        setuserDropDown(!userDropDown)
        setvideooption(false)
    }
    const handleVideodropDown = () => {
        setuserDropDown(false)
        setvideooption(!videooption)

    }


    const logout = async () => {
        localStorage.clear()
        setisLogged(false)
        setuserDropDown(false)
        window.location.reload()
        navigate('/')
    }
   
    useEffect(() => {
        const userprofile = localStorage.getItem('profilepic');
    
        
        if (userprofile !== null) {
            setprofilepic(userprofile)
            setuserDropDown(false)
            setisLogged(true)
        }

    },[])
   
       
        useEffect(() => {
            // Call API to check if the user has a channel
            const checkUserChannel = async () => {
                try {
                    const response = await axios.get('http://localhost:8200/create/userChannel', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`  // Send token to verify the user
                        }
                    });

                    if (response.data.success) {
                        setHasChannel(true);  // User has a channel
                    } else {
                        setHasChannel(false);  // User does not have a channel
                    }
                } catch (error) {
                    
                    console.error(error);
                } 
            };

            checkUserChannel();  // Call the function on component mount
        }, []);  // Empty array ensures this is called only once when the component mounts


    
        const handleSearch = (e) => {
            setinputvalue(e.target.value)
            console.log(e.target.value)
    }
    const handlesearch = () => {
    setsearch(inputvalue)
}

    return (
        <div className='Nav'>
           
            <div className='first'>
                
                <MenuIcon className='menuicon' onClick={() => { setShowSidenav(!sidenav)}} />
                 <Link to={'/'} className='link'>
                <div className='icon_wrapper'>
                    <YouTubeIcon className='youtubeicon' />
                    <h1 className='Youtube_text'>Youtube</h1>
                    </div>
                </Link>
                
                </div>
           
            <div className='input_main'>
                <div className='input_wrapper'>
                    <input type='text' onChange={(e)=>{handleSearch(e)} }  />
                    <button className='searchbtn' onClick={handlesearch}><SearchIcon /></button>
                </div>
                <div className='mic'>
                    <MicIcon />
                </div>
            </div>
            <div className='third'>
                <div className='videoUpload'><VideoCallOutlinedIcon onClick={handleVideodropDown} />
                    <div className={videooption ? "ChannelDropDown" :"ChannelDropDownHide"}>
                        {!hasChannel && <Link style={{ textDecoration: "none", color: "black" }} to={'/create'}>   <p>Create Channel</p></Link> }   
                        {hasChannel && < Link style={{ textDecoration: "none", color: "black" }} to={'/channel'}>    <p>Upload video</p></Link> } 
                    </div>
                </div>
                <div className='notification'><NotificationsIcon /></div>

                <div className="user"><img src={profilepic} alt="" className='navimg' onClick={handleProfiledropDown} /></div>
                <div className={userDropDown ? "Profilepage" :"Profilepagehide"}>
                     
                    {!isLogged && <Link style={{ textDecoration: "none" }} to={'/user/login'}>  <div className='profile'>Login</div></Link> }      
                    {isLogged && <div onClick={logout} className='profile'>Logout</div> } 
            </div >
            
            </div>
            
        </div>
    )
}

export default Nav