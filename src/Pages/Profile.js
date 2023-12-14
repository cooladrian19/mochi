import React from 'react'
import "./Profile.css"
import NavBar from '../Components/NavBar/NavBar'
import ProfileEdit from '../Components/ProfileEdit/ProfileEdit'

export default function Profile() {
  return (
    <div>
        <NavBar />
        
        <ProfileEdit />
    </div>
  )
}
