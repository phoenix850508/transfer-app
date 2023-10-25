import React from "react";

function Stepper() {
  return (
    <div className="flex items-center justify-between sm:text-xs md:text-base text-gray-600">
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          1
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fit break-words">
          Contact
        </span>
      </div>
      <div className="h-1 sm:mx-1 md:mx-3 w-1/2 bg-[#cbd5e1] dark:bg-indigo-600" />
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          2
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fitbreak-words">
          Payment
        </span>
      </div>
      <div className="h-1 sm:mx-1 md:mx-3 w-1/2 bg-[#cbd5e1] dark:bg-blue-600" />
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          3
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fit break-words">
          Complete
        </span>
      </div>
    </div>
  );
}

export default Stepper;
