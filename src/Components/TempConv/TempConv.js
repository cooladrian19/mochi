import React, { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";
import Mochi from "../../assets/mochi.png";

export default function TempConv() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="temp-wrapper">
      <div className="temp-msg">
        <div className="temp-head">
          <img src={Mochi} />
          <span>mochi</span>
        </div>
        <p>hello {currentUser.displayName}, start up a conversation!</p>
      </div>
    </div>
  );
}
