import React, { useState } from "react";

function Calendar({ show, onResetClick, onDateChange, selectedDate }) {
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
  const firstDayOfMonth = new Date(
    selectedDate.year,
    selectedDate.month,
    1,
  ).getDay();
  const lastDayOfMonth = new Date(
    selectedDate.year,
    selectedDate.month + 1,
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
            <button
              id="prevMonth"
              className="text-white"
              onClick={() => onDateChange?.("prevMonth")}
            >
              Prev
            </button>
            <h2 id="currentMonth" className="text-white">
              {months[selectedDate.month]} {selectedDate.year}
            </h2>
            <button
              id="nextMonth"
              className="text-white"
              onClick={() => onDateChange?.("nextMonth")}
            >
              Next
            </button>
          </div>
          <div
            className="grid grid-cols-7 gap-2 p-4 list-none sm:text-xs md:text-sm"
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
              return (
                <li
                  className="cursor-pointer border-2 border-[white]  hover:border-2 hover:border-[#3b82f6]"
                  key={index}
                  onClick={() => onDateChange?.("changeDate", date)}
                >
                  {date}
                </li>
              );
            })}
          </div>
          <div className="p-3">
            <button
              className="w-full bg-gray-300 text-[#0f172a] rounded-md p-2 sm:text-xs md:text-sm hover:bg-gray-400"
              onClick={onResetClick}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
