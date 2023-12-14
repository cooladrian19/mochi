import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import { db} from "../../firebaseConfig"
import { doc } from "firebase/firestore"
import { ChatContext } from "../../contexts/ChatContext";


export default function Chats() {

  const [chats,setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect (() => {
    const getChats = () => {

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      })
  
      return ()=> {
        unsub();
      }

    }
    currentUser.uid && getChats();
  }, [currentUser.uid])


  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }
  

  return (
    <div className="chats-container">
      <div className="chats-header">
        <span>conversations</span>
      </div>
      {Object.entries(chats) ?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (
        <div className="user-chat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
      ))}

   </div>
  );
}
