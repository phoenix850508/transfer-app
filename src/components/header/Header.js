import React from "react";
import rawLogoWhite from "icons/transfer-logo-white.svg";
import { useNavigate } from "react-router-dom";
import Button from "components/buttons/Button";

function Header() {
  const navigate = useNavigate();
  const handleNewTrans = () => {
    navigate("/transaction/new");
  };
  return (
    <div className="w-full bg-[#00008B] h-20 grid sm:grid-cols-1 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 items-center sticky top-0 z-10">
      <div className=""></div>
      <div className="flex items-center">
        <img
          className="absolute left-1/2 sm:-translate-x-1/2 md:-translate-x-2/3 sm:w-40 md:w-64"
          src={rawLogoWhite}
          alt=""
        ></img>
      </div>
      <div className="sm:flex justify-center flex items-start p-1">
        <Button onButtonClick={handleNewTrans} buttonText="$ NEW" />
      </div>
    </div>
  );
}

export default Header;
