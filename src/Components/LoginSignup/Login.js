import React from 'react'
import { Link } from "react-router-dom";  
import "./style.css";
import MochiLogo from "../../assets/mochi.png";

export default function Login() {
  return (
    <div className="login-container">
      <div className="mochi-logo-container">
        <Link to="/home" className="mochi-logo"><img src={MochiLogo} /></Link>
      </div>
      <form className="login-field" >
        <div className="login-section-container">
          <label>Email:</label>
          <input
            className="input-field"
            type="text"
            id="login-email"
            placeholder="email"
            required
          />
        </div>

        <div className="login-section-container">
          <label>Password:</label>
          <input
            className="input-field"
            type="password"
            id="login-password"
            placeholder="password"
            required
          />
        </div>

        <button id="login" className="login-button" type="submit">
          Login
        </button>
        <div className="login-footer">
          No account?{" "}
          <Link to="/LoginSignup/signup" className="link" href="">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}
