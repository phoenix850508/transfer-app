import React from "react";
import TransactionCard from "./TransactionCard";
import Menu from "./Menu";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import Spinner from "components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { app } from "utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavbarContainer from "components/container/NavbarContainer";

function Home() {
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const onDateBtnClick = () => {
    setIsCalendarShow(!isCalendarShow);
  };
  const [isDataExist, setIsDataExist] = useState(false);
  const dataArr = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 0];
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsDataExist(true);
    }, 700);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 若初次登入，跳轉到編輯名字ProfileInit
        if (!user.providerData[0].displayName) {
          navigate("/profile/inialize");
        }
      }
      // 若使用者尚未登入，導回到登入頁面
      else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <NavbarContainer>
      <div className="flex flex-col items-start mt-5 gap-5 max-w-md mx-auto md:max-w-2xl m-5 px-4 relative">
        <div>
          <Menu onDateBtnClick={onDateBtnClick} />
          <div className="absolute left-0 end-0">
            <Calendar show={isCalendarShow ? "block" : "hidden"} />
          </div>
        </div>
        <h1 className="text-[#9ca3af] text-xl p-2">Public</h1>
      </div>
      {isDataExist ? (
        dataArr.map((_, index) => {
          return <TransactionCard key={index} />;
        })
      ) : (
        <Spinner />
      )}
    </NavbarContainer>
  );
}

export default Home;
