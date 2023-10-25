import Button from "components/buttons/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

function NewTransactionForm() {
  const navigate = useNavigate();
  return (
    <form>
      <div className="form-row">
        <input
          className="w-full border-2 p-2 mb-3"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="form-row flex flex-col items-center gap-3">
        <img
          className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
          src="https://placedog.net/210"
          alt=""
        />
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Search..."
        />
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Search..."
        />
        <div className="sm:gap-4 md:gap-6 grid grid-cols-2">
          <Button
            onButtonClick={(e) => {
              e.preventDefault();
            }}
            buttonText="REQUEST"
          />
          <Button
            onButtonClick={(e) => {
              e.preventDefault();
            }}
            buttonText="PAY"
          />
        </div>
      </div>
      <div className="form-row flex flex-col items-center gap-7 text-[#0000AE] font-semibold sm:text-sm md:text-xl word-break py-7">
        <div className="w-full flex flex-col gap-3 items-center">
          <img
            className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
            src="https://placedog.net/210"
            alt=""
          />
          <span>John Doe</span>
        </div>
        <p className="mt-10">Requested $3.00 for xxxasdasdasdas</p>
        <div className="w-full flex flex-col gap-2">
          <button
            className="bg-[#e5e7eb] text-[#0f172a] rounded-md p-2 sm:text-xs md:text-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            RETURN HOME
          </button>
          <button
            className="bg-[#e5e7eb] text-[#0f172a] rounded-md p-2 sm:text-xs md:text-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate("/transaction/new");
            }}
          >
            NEW TRANSACTION
          </button>
        </div>
      </div>
    </form>
  );
}

export default NewTransactionForm;
