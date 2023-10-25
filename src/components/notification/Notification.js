import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import React from "react";
import MessageCards from "./MessageCards";

function Notification() {
  return (
    <div className="flex relative">
      <Dashboard />
      <div className="w-full">
        <Header />
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
          <h1 className="text-[#0000AE] text-start">No notifications</h1>
          <div className="border-2 py-10">
            <MessageCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
