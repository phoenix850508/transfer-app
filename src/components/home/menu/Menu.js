import React from "react";

function Menu({ periodText = "ALL", onDateBtnClick }) {
  return (
    <button onClick={onDateBtnClick}>
      <span className="border-2 border-[#00008E] p-2 rounded-full text-[#00008E]">
        Date: {periodText}
      </span>
    </button>
  );
}

export default Menu;
