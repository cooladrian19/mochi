import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginSignup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/LoginSignup/*" element={<LoginSignup/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
