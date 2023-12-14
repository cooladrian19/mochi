import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../Components/LoginSignup/Login";
import Signup from "../Components/LoginSignup/Signup";
import { doc, setDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db} from "../firebaseConfig";

export default function LoginSignup() {
  const navigate = useNavigate();

  const handleSignup = async (email, password, displayName, file) => {
    try {
      if (!file) {
        throw new Error('No file selected for upload.');
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
  
      const storageRef = ref(storage, `profile_images/${displayName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress
        }, 
        (error) => {
          // Handle unsuccessful uploads
          throw error;
        }, 
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", user.uid),{});
          navigate("/home");
        }
      );
    } catch (error) {
      alert(error.message);
      console.error("Error during signup:", error.message);
    }
  };
  

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential, "auth data");
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error during login:", error.message);
      });
  };

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}
