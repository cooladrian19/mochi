import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, updateDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    setError(false);  // Reset error state for new search
    setUser(null);    // Reset user state for new search
  
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // No results found
        setError(true);
        setUser(null);
      } else {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      setError(true);
    }
  };
  

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async() => {
    const combineID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combineID))

      if(!res.exists()){
        // create a chat in chats collection if doesnt exist;
        await setDoc(doc (db, "chats", combineID),{messages: []});
      

      // create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combineID + ".userInfo"] : {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combineID + ".date"] : serverTimestamp(),
      })

      await updateDoc(doc(db, "userChats", user.uid), {
        [combineID + ".userInfo"] : {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combineID + ".date"] : serverTimestamp(),
      })
    }
    } catch(error) {
      console.error("Error creating or updating chat document: ", error);
      
    }

    setUser(null);
    setUsername("");
    
  }

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span className="no-user-found"> <i class="fa-regular fa-face-frown-open"></i>user not found</span>}
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="user-chat-info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}
