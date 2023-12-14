import React, {useContext, useState} from "react";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


export default function Input() {

  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const removeImage = () => {
    setImage(null);
  }

  const handleSend= async() => {

    if (!text.trim() && !image) {
      return; // Do nothing if both are empty
    }

    if(image) {

      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', 
        (snapshot) => {
        }, 
        (error) => {
          throw error;
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "chats", data.chatID), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderID: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            })
            
          })
        }
      );
      
    } else {  
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        })
      })
    }

    await updateDoc (doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    })
    await updateDoc (doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text,
      },
      [data.chatID + ".date"]: serverTimestamp(),
    })

    setText("")
    setImage(null)

  }

 

  return (
    <div className="input-container">
      <input
      
        className="input-message"
        type="text"
        placeholder="send something..."
        onChange={e=>setText(e.target.value)}
        value={text}
        onKeyPress={e => e.key === "Enter" ? handleSend(): null}
        accept="image/*"
      />
       {image && (
        <div className="image-preview-container">
          <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />
          <button onClick={removeImage} className="remove-image-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>
      )}
      <div className="send-container">
        <input type="file" style={{ display: "none" }} id="file" onChange={e=>setImage(e.target.files[0])} />
        <label htmlFor="file">
          <i class="fa-regular fa-file-image"></i>
        </label>
        <button className="send-msg-btn" onClick={handleSend}>
          <i class="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
