import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import DefaultProfile from "../../assets/defaultProfile.png";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";

export default function SideBar() {
  return (
    <div className="sidebar-wrapper">
      <Search />
      <Chats />
    </div>
    
  );
}
