import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Components/LoginSignup/Login'
import Signup from '../Components/LoginSignup/Signup'

export default function LoginSignup() {

  return (
    <div >
      <Routes>
        <Route path="/signup" element={<Signup  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/" element={<Login  />} />
      </Routes>
    </div>
  );
}
