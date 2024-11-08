import React from 'react'
import './../SideNav/Sedenav.css'

import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';

function Sidenav({sidenav}) {
  return (
      <div className={sidenav?"main":"Sidenone"}>
          <div className='Sidewrapper'>

              <div className='wrapper'>
                  <HomeIcon className='icon'/>
                  <p>Home</p>
              </div>
              <div className='wrapper'>
                  <SlowMotionVideoIcon className='icon' />
                  <p>Shorts</p>
              </div>
              <div className='wrapper'>
                  <SubscriptionsOutlinedIcon className='icon' />
                  <p>Subscribe</p>
              </div>

              <hr className='hr' />
              <div className='wrapper'>
                  
                  <p>You</p>
                  <ChevronRightIcon/>
              </div>
              <div className='wrapper'>
                  <HistoryIcon className='icon' />
                  <p>History</p>
              </div>
              <div className='wrapper'>
                  <PlaylistPlayIcon className='icon' />
                  <p>Playlist</p>
              </div>
              <div className='wrapper'>
                  <WatchLaterOutlinedIcon className='icon' />
                  <p>watch Later</p>
              </div>
              <div className='wrapper'>
                  <ThumbUpOutlinedIcon className='icon' />
                  <p>Liked video</p>
              </div>
              <hr className='hr'/>
              <div className='wrapper'>
                  
                  <p>Explore</p>
              </div>
              <div className='wrapper'>
                  <LocalFireDepartmentOutlinedIcon className='icon' />
                  <p>Trending</p>
              </div>
              <div className='wrapper'>
                  <ShoppingBagOutlinedIcon className='icon' />
                  <p>Shopping</p>
              </div>
              <div className='wrapper'>
                  <FeedOutlinedIcon className='icon' />
                  <p>Shopping</p>
              </div>
              <div className='wrapper'>
                  <FeedOutlinedIcon className='icon' />
                  <p>News</p>
              </div>


              
          </div>
    </div>
  )
}

export default Sidenav