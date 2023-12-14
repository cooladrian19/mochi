import React from "react";
import { Link } from "react-router-dom";
import WhiteMochiLogo from "../../assets/white-mochi.png";
import "./style.css";

export default function Signup({ onSignup }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target["signup-username"].value;
    const email = e.target["signup-email"].value;
    const password = e.target["signup-password"].value;
    const confirmPassword = e.target["confirm-password"].value;
    const pf = e.target["pf-img"].files[0];
    if (!pf) {
      alert("Please select a profile image to upload.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    onSignup(email, password, displayName, pf);
  };

  return (
    <div className="login-container">
      <Link to="/home" className="mochi-logo"><img src={WhiteMochiLogo} /><span>mochi</span></Link>
      <form className="login-field" onSubmit={handleSubmit}>
        <div className="login-section-container">
          <label>Username:</label>
          <input
            className="input-field"
            type="text"
            id="signup-username"
            placeholder="username"
          />
        </div>
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
        <div className="login-section-container">
          <input type="file" style={{ display: "none" }} id="pf-img" />
          <label htmlFor="pf-img"> profile image:
            <i class="fa-regular fa-file-image"></i>
          </label>
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
