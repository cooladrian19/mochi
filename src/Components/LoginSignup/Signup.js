import React from "react";
import { Link } from "react-router-dom";
import MochiLogo from "../../assets/mochi.png";
import "./style.css";

export default function Signup() {
  return (
    <div className="login-container">
      <div className="mochi-logo-container">
        <Link to="/home" className="mochi-logo"><img src={MochiLogo} /></Link>
      </div>
      <form className="login-field">
        {/* 
          <div className='login-section-container'>
            <label>Username:</label>
            <input className="input-field" type="text" id="signup-username" placeholder="username" />
          </div>
          */}
        <div className="login-section-container">
          <label>Email:</label>
          <input
            className="input-field"
            type="text"
            id="signup-email"
            placeholder="email"
            required
          />
        </div>
        <div className="login-section-container">
          <label>Password:</label>
          <input
            className="input-field"
            type="password"
            id="signup-password"
            placeholder="password"
            required
          />
        </div>
        <div className="login-section-container">
          <label>confirm password:</label>
          <input
            className="input-field"
            type="password"
            id="confirm-password"
            placeholder="password"
            required
          />
        </div>

        <button id="signup" className="login-button" type="submit">
          Signup
        </button>
        <div className="login-footer">
          Already have an account?{" "}
          <Link to="/LoginSignup/login" className="link" href="">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
