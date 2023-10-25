import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 sticky">
      <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r border-[#f3f4f6] bg-[#e2e8f0] sm:hover:w-48 md:hover:w-56 hover:bg-white hover:shadow-lg group sticky top-0 left-0 z-10">
        <div className="w-full flex h-screen flex-col justify-between pt-2 pb-6">
          <div className="w-full relative">
            <div className="w-max p-2.5">
              <div className="w-full flex items-center gap-2">
                <img
                  className="h-9 w-9 cursor-pointer rounded-full object-cover object-center"
                  src="https://placedog.net/210"
                  alt=""
                />
                <div className="flex flex-col items-start sm:text-xs md:text-base text-left">
                  <p className="sm:w-24 md:w-40 text-gray-600 break-words">
                    John Doe
                  </p>
                  <p className="sm:w-24 md:w-40 text-gray-600 break-words">
                    user1@example.com
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pt-3 hidden group-hover:inline-block font-semibold flex justify-start text-start text-lg text-gray-600">
              <span>$132,132</span>
              <h2>Account Balance</h2>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide flex flex-col hover:cursor-pointer">
              <i
                className="fa-solid fa-house fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"
                onClick={() => navigate("/home")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Home
                </span>
              </i>
              <i
                className="fa-solid fa-user fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"
                onClick={() => navigate("/setting")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  My Account
                </span>
              </i>
              <i
                className="fa-solid fa-bell fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"
                onClick={() => navigate("/notifications")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Notification
                </span>
              </i>
            </ul>
          </div>
          <div className="w-max -mb-3">
            <i className="fa-solid fa-right-from-bracket group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max hover:cursor-pointer  hover:text-cyan-600">
              <span
                className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600"
                onClick={() => navigate("/login")}
              >
                Logout
              </span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
