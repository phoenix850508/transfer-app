import React from "react";

function Button({ onButtonClick, buttonText }) {
  return (
    <button
      className="bg-[#22c55e] text-[white] rounded-md p-2 md:text-lg"
      onClick={onButtonClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;
