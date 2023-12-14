import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import Home from "./Pages/Home";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./contexts/AuthContext"; 
import {  ChatProvider } from "./contexts/ChatContext";
import Profile from "./Pages/Profile";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext); 

  if (!currentUser) {
    return <Navigate to="/LoginSignup/" />;
  }

  return children; 
};

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/LoginSignup/*" element={<LoginSignup />} />
            <Route path="/profile"  element={<Profile />}/>
          </Routes>
        </BrowserRouter>
      </div>
      </ChatProvider>
      
    </AuthProvider>
  );
}

export default App;
