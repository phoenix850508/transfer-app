import React from "react";
import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import TransactionCard from "./TransactionCard";
import Menu from "./menu/Menu";
import Calendar from "./calendar/Calendar";
import { useState } from "react";

function Home() {
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const onDateBtnClick = () => {
    setIsCalendarShow(!isCalendarShow);
  };

  return (
    <div className="flex relative">
      <Dashboard />
      <div className="w-full">
        <Header />
        <div className="flex flex-col items-start mt-5 gap-5 max-w-md mx-auto md:max-w-2xl m-5 px-4 relative">
          <div>
            <Menu onDateBtnClick={onDateBtnClick} />
            <div className="absolute left-0 end-0">
              <Calendar show={isCalendarShow ? "block" : "hidden"} />
            </div>
          </div>
          <h1 className="text-[#9ca3af] text-xl p-2">Public</h1>
        </div>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
}

export default Home;
