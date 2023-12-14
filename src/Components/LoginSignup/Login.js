import React from 'react'
import { Link } from "react-router-dom";  
import "./style.css";
import WhiteMochiLogo from "../../assets/white-mochi.png";

export default function Login({onLogin}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target["login-email"].value;
    const password = e.target["login-password"].value;
    onLogin(email, password);
  };

  return (
    <div className="login-container">
     
        <Link to="/home" className="mochi-logo"><img src={WhiteMochiLogo} /><span>mochi</span></Link>
        
    
      <form className="login-field" onSubmit={handleSubmit} >
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
