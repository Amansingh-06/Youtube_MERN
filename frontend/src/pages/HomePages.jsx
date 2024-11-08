import React from 'react'

import Home from '../components/HomePage/Home'
import Sidenav from '../components/SideNav/Sidenav'

function HomePages({ sidenav, search }) {
  console.log(search)
  return (
    
      <>
      <Sidenav sidenav={sidenav } />
      <Home sidenav={sidenav} search={search} />
      </>
  )
}

export default HomePages