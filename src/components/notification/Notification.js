import NavbarContainer from "components/container/NavbarContainer";
import React from "react";
import MessageCards from "./MessageCards";

function Notification() {
  return (
    <NavbarContainer>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
        <h1 className="text-[#0000AE] text-start">No notifications</h1>
        <div className="border-2 py-10">
          <MessageCards />
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Notification;
