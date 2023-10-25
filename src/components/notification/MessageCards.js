import React from "react";
import messageLogo from "icons/undraw_reminders_697p.svg";

function MessageCards() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <img src={messageLogo} alt="" />
    </div>
  );
}

export default MessageCards;
