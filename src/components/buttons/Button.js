import React from "react";
import clsx from "clsx";

function Button({ onButtonClick, buttonText, action = "confirm" }) {
  return (
    <button
      className={clsx(
        "text-[white] rounded-md sm:p-1 md:p-2 md:text-lg",
        { "bg-[#22c55e]": action === "confirm" },
        { "bg-red-500": action === "cancel" },
      )}
      onClick={onButtonClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;
