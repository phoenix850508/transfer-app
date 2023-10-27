import React from "react";
import clsx from "clsx";

function Stepper({ step }) {
  console.log(step);
  return (
    <div className="flex items-center justify-between sm:text-xs md:text-base text-gray-600">
      <div className="flex items-center">
        <div className="sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white bg-[#525252]">
          1
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fit break-words text-[#a3a3a3]">
          Contact
        </span>
      </div>
      <div className="h-1 sm:mx-1 md:mx-3 w-1/2 bg-[#525252] dark:bg-indigo-600" />
      <div className="flex items-center">
        <div
          className={clsx(
            "sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white",
            { "bg-[#a3a3a3]": step === "contact" },
            { "bg-[#525252]": step !== "contact" },
          )}
        >
          2
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fitbreak-words text-[#a3a3a3]">
          Payment
        </span>
      </div>
      <div
        className={clsx(
          "h-1 sm:mx-1 md:mx-3 w-1/2 dark:bg-blue-600",
          { "bg-[#a3a3a3]": step === "contact" },
          { "bg-[#525252]": step !== "contact" },
        )}
      />
      <div className="flex items-center">
        <div
          className={clsx(
            "sm:w-4 sm:h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white",
            { "bg-[#a3a3a3]": step !== "complete" },
            { "bg-[#525252]": step === "complete" },
          )}
        >
          3
        </div>
        <span className="sm:ml-1 md:ml-4 font-medium max-w-fit break-words text-[#a3a3a3]">
          Complete
        </span>
      </div>
    </div>
  );
}

export default Stepper;
