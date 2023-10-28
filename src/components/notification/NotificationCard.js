import React from "react";

function NotificationCard({ userSender, eventType, amount, note }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div className="p-8 flex">
        <img
          className="h-9 w-9 cursor-pointer rounded-full object-cover object-center"
          src="https://placedog.net/210"
          alt=""
        />
        <div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Event Name
          </div>
          <p className="mt-2 text-gray-500">Event Description</p>
          <p className="mt-2 text-gray-500">Event Details...</p>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
