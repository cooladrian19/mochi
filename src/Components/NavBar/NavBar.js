import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { signOut } from "firebase/auth";
import  {auth} from "../../firebaseConfig"
import { AuthContext } from "../../contexts/AuthContext";
import Profile from "../../Pages/Profile";

export default function NavBar() {

  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        navigate("/LoginSignup/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <div className="nav-container">
      <span className="nav-logo">mochi</span>

      <div className="nav-right">
        <Link to="/profile" className="nav-user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName} </span>
        </Link>
        
        <button  onClick={handleSignOut}>logout</button>
      </div>
    </div>
  );
}
