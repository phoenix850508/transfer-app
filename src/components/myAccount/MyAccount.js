import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import React from "react";
import setting from "icons/undraw_personal_settings_kihd.svg";

function MyAccount() {
  return (
    <div className="flex relative">
      <Dashboard />
      <div className="w-full">
        <Header />
        <div className="grid sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-3 md:grid-rows-1 sm:gap-5 md:gap-10 sm:mt-5 md:mt-20 m-5">
          <img src={setting} alt="" />
          <div className="col-span-2 row-span-3 sm:p-2 md:p-5 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-10">
            <input className="border-2 p-2 w-full" type="text" />
            <input className="border-2 p-2 w-full" type="text" />
            <input className="border-2 p-2 w-full" type="text" />
            <input className="border-2 p-2 w-full" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
