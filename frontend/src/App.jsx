import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePages from './pages/HomePages'
import Nav from './components/Nav/Nav'
import Video from './pages/Video/Video'
import Login from './components/Login/Login'
import Signup from './pages/SignUP/Signup'
import Channel from './pages/Channel/Channel'
import ChannelProfile from './pages/ChannelProfile/ChannelProfile'
import CreateChannel from './pages/CreateChannel/CreateChannle'



function App() {

  const [showSidenav, setShowSidenav] = useState(false);
  const [search, setsearch] = useState('')
  return (
    <>
      <Nav sidenav={showSidenav} setShowSidenav={setShowSidenav} setsearch={ setsearch} />
      <Routes>
        <Route path='/' element={<HomePages sidenav={showSidenav} search = {search} />} />
        <Route path="/watch/:id" element={<Video sidenav={showSidenav}/>} />
        <Route path="/user/login" element={<Login />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/channel' element={<Channel />} />
        <Route path='/user/:id' element={<ChannelProfile sidenav={showSidenav} />} />
        <Route path='/create' element={<CreateChannel/>}/>
        
      </Routes>
      

    </>
  )
}

export default App