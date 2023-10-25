import React from "react";
import rwaLogoWhite from "icons/rwa-logo-white.svg";

function Header() {
  return (
    <div className="w-full bg-[#00008B] h-20 grid sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 items-center relative">
      <div className=""></div>
      <div className="flex items-center">
        <img
          className="absolute left-1/2 -translate-x-1/2 sm:w-40 md:w-72"
          src={rwaLogoWhite}
          alt=""
        ></img>
      </div>
      <div className="sm:flex sm:justify-end md:justify-start flex items-center">
        <button className="bg-[green] text-[white] rounded-md p-1 sm:translate-x-1/2">
          $ NEW
        </button>
      </div>
    </div>
  );
}

export default Header;
