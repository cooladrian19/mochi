import React, { useContext } from "react";
import "./style.css";
import Messages from "../Messages/Messages"
import Input from "../Input/Input"
import { ChatContext } from "../../contexts/ChatContext";

export default function Conv() {

  const {data, dispatch} = useContext(ChatContext);

  const handleCloseConv = () => {
    // Dispatch an action to reset the chat context
    dispatch({
      type: "RESET_CHAT",
    });
  };


  return (
    <div className="conv-wrapper">
      <div className="conv-header">
        <span className="conv-name">{data.user?.displayName}</span>
        <div className="conv-options">
        <i class="fa-regular fa-bookmark"></i>
        <i class="fa-regular fa-circle-xmark"  onClick={handleCloseConv}></i>
        </div>
      </div>

      <Messages />
      <Input />

      
    </div>
  );
}
