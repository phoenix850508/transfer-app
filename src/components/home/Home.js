import React from "react";
import Dashboard from "components/dashboard/Dashboard";
import Header from "components/header/Header";
import TransactionCard from "./TransactionCard";
import Menu from "./menu/Menu";
import Calendar from "./calendar/Calendar";
import { useState, useEffect } from "react";
import Spinner from "components/spinner/Spinner";

function Home() {
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const onDateBtnClick = () => {
    setIsCalendarShow(!isCalendarShow);
  };
  const [isDataExist, setIsDataExist] = useState(false);
  const dataArr = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 0];

  useEffect(() => {
    setTimeout(() => {
      setIsDataExist(true);
    }, 2000);
  }, []);
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
        <>
          {isDataExist ? (
            dataArr.map((_, index) => {
              return <TransactionCard key={index} />;
            })
          ) : (
            <Spinner />
          )}
        </>
      </div>
    </div>
  );
}

export default Home;
