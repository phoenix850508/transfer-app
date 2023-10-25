import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-white hover:shadow-lg group">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div className="relative">
            <div className="w-max p-2.5">
              <div className="w-full flex items-center gap-4">
                <img
                  className="h-9 w-9 cursor-pointer rounded-full object-cover object-center"
                  src="https://placedog.net/210"
                  alt=""
                />
                <div className="flex flex-col items-start">
                  <span className="text-gray-600">John Doe</span>
                  <span className="text-gray-600">user1@example.com</span>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide flex flex-col hover:cursor-pointer">
              <i className="fa-solid fa-house group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600">
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Home
                </span>
              </i>
              <i className="fa-solid fa-building-columns group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600">
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Bank Account
                </span>
              </i>
              <i className="fa-solid fa-user group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600">
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  My Account
                </span>
              </i>
              <i className="fa-solid fa-bell group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600">
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
