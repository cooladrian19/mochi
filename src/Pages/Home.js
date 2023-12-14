import React, { useContext } from "react";
import SideBar from "../Components/SideBar/SideBar";
import Conv from "../Components/Conv/Conv";
import "./Home.css"
import { ChatContext } from "../contexts/ChatContext";
import TempConv from "../Components/TempConv/TempConv";
import NavBar from "../Components/NavBar/NavBar";


export default function Home() {

  const { data } = useContext(ChatContext)

  return (
    <div className="home">
       <NavBar />
      <div className="body-container">
        <SideBar />
        {data.chatID !== "null" ? <Conv /> : <TempConv />}
      </div>
    </div>
  );
}
