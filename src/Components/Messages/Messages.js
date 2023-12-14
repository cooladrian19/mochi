import React, { useEffect, useState, useContext } from 'react'
import "./style.css"
import Message from "../Message/Message"
import { onSnapshot, doc } from 'firebase/firestore';
import { db} from "../../firebaseConfig";
import { ChatContext } from '../../contexts/ChatContext';

export default function Messages() {

  const[messages, setMessages] = useState([])
  const {data} = useContext(ChatContext);


  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unsub();
    }
  }, [data.chatID])

  return (
    <div className='messages-container'>
      {messages.map(m=> (
        <Message message={m} key={m.id} />
      ))}


    </div>
  )
}
