import React, { useContext, useEffect, useRef } from 'react'
import "./style.css";
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { formatRelative, differenceInSeconds } from 'date-fns'; 

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  const formatDate = (timestamp) => {
    const now = new Date();
    const messageDate = timestamp.toDate();
    const secondsDiff = differenceInSeconds(now, messageDate);

    if (secondsDiff < 60) {
      return 'just now';
    }

    return formatRelative(messageDate, now);
  };

  return (

    <div ref={ref} className={`message-container ${message.senderID === currentUser.uid && "message-owner-container"}`}>
      <div className='message-info'>
        <img src={message.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL}  alt='' />
        <span>{formatDate(message.date)}</span>
      </div>
      <div className='message-content'>
          <p>{message.text}</p>
          { message.image && <img src={message.image}  alt=''/>
          }
          
      </div>
    </div>
  )
}

export default Message;