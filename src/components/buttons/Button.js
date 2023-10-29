import React from "react";
import clsx from "clsx";

function Button({ onButtonClick, buttonText, action = "confirm" }) {
  return (
    <button
      className={clsx(
        "text-[white] rounded-md sm:p-1 md:p-2 md:text-lg",
        { "bg-green-500 hover:bg-green-600": action === "confirm" },
        { "bg-red-500 hover:bg-red-600": action === "cancel" },
      )}
      onClick={onButtonClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;
