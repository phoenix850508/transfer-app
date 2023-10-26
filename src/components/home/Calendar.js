import React from "react";

function Calendar({ show }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currDate = new Date();
  const firstDayOfMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    1,
  ).getDay();
  const lastDayOfMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth() + 1,
    0,
  ).getDate();
  const dates = [];
  dates.length = lastDayOfMonth;
  for (let i = 0; i <= lastDayOfMonth - 1; i++) {
    dates.splice(firstDayOfMonth + i, 1, i + 1);
  }
  // replace each element of dates array with empty string
  for (let j = firstDayOfMonth; j > 0; j--) {
    dates.splice(firstDayOfMonth - j, 1, "");
  }
  return (
    <div className={`${show} w-50`}>
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button id="prevMonth" className="text-white">
              Prev
            </button>
            <h2 id="currentMonth" className="text-white">
              {months[currDate.getMonth()]} {currDate.getFullYear()}
            </h2>
            <button id="nextMonth" className="text-white">
              Next
            </button>
          </div>
          <div
            className="grid grid-cols-7 gap-2 p-4 list-none  sm:text-xs md:text-sm"
            id="calendar"
          >
            {/* Calendar Days Go Here */}
            {days.map((day, index) => {
              return (
                <li className="font-semibold" key={index}>
                  {day}
                </li>
              );
            })}
            {dates.map((date, index) => {
              return <li key={index}>{date}</li>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
