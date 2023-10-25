import React from "react";

function Stepper() {
  return (
    <div className="flex items-center justify-between sm:text-xs md:text-base text-gray-600">
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          1
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium">Step 1</span>
      </div>
      <div className="h-1 sm:w-5 md:w-16 bg-[#cbd5e1] dark:bg-indigo-600" />
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          2
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium">Step 2</span>
      </div>
      <div className="h-1 sm:w-5 md:w-16 bg-[#cbd5e1] dark:bg-blue-600" />
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#cbd5e1] rounded-full flex items-center justify-center text-white">
          3
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium">Step 3</span>
      </div>
    </div>
  );
}

export default Stepper;
