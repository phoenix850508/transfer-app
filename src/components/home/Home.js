import React from "react";
import TransactionCard from "./TransactionCard";
import Menu from "./Menu";
import Calendar from "./Calendar";
import { useState, useEffect, useRef } from "react";
import Spinner from "components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { app } from "utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "utils/firebase";
import NavbarContainer from "components/container/NavbarContainer";
import transactionLogo from "icons/undraw_transfer_money_rywa.svg";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

function Home() {
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isDataExist, setIsDataExist] = useState(false);
  const currDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: currDate.getFullYear(),
    month: currDate.getMonth(),
    date: currDate.getDate(),
  });
  const dateTextRef = useRef("ALL");
  const auth = getAuth(app);
  const navigate = useNavigate();

  // 點擊外層Date按鈕
  const onDateBtnClick = () => {
    setIsCalendarShow(!isCalendarShow);
  };

  // 選擇calendar date
  const handleDateChangeClick = (type, date) => {
    if (type === "prevMonth") {
      // 調整當月份為1月時，重新往前一個12月計算
      if (selectedDate.month === 0) {
        // 改變按鈕Text
        dateTextRef.current = `${selectedDate.year - 1}/12/${
          selectedDate.date
        }`;
        setSelectedDate({
          ...selectedDate,
          year: selectedDate.year - 1,
          month: 11,
        });
      } else {
        setSelectedDate({ ...selectedDate, month: selectedDate.month - 1 });
        // 改變按鈕Text
        dateTextRef.current = `${selectedDate.year}/${selectedDate.month - 1}/${
          selectedDate.date
        }`;
      }
    } else if (type === "nextMonth") {
      // 調整當月份為12月時，重新往1月計算
      if (selectedDate.month === 11) {
        setSelectedDate({
          ...selectedDate,
          year: selectedDate.year + 1,
          month: 0,
        });
        // 改變按鈕Text
        dateTextRef.current = `${selectedDate.year + 1}/1/${selectedDate.date}`;
      } else {
        setSelectedDate({ ...selectedDate, month: selectedDate.month + 1 });
        // 改變按鈕Text
        dateTextRef.current = `${selectedDate.year}/${selectedDate.month + 1}/${
          selectedDate.date
        }`;
      }
    } else if (type === "changeDate") {
      setSelectedDate({ ...selectedDate, date });
      setIsCalendarShow(false);
      // 改變按鈕Text
      dateTextRef.current = `${selectedDate.year}/${selectedDate.month}/${date}`;
    }
  };

  const handleResetClick = () => {
    setSelectedDate({
      year: currDate.getFullYear(),
      month: currDate.getMonth(),
      date: currDate.getDate(),
    });
    dateTextRef.current = "ALL";
    setIsCalendarShow(false);
  };

  const transactionsSorted =
    transactions && transactions.sort((a, b) => b.timestamp - a.timestamp);

  useEffect(() => {
    // 找出所有Transaction紀錄
    const fetchNotifications = async () => {
      const q = query(collection(db, "users/notifications_doc/notifications"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.transaction_id = doc.id;
        setTransactions((existingNoti) => {
          return [...existingNoti, docData];
        });
      });
    };

    fetchNotifications();

    // loading圖示
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

    // 設定套件default時間顯示語言
    TimeAgo.addDefaultLocale(en);
  }, []);
  return (
    <NavbarContainer>
      <div className="flex flex-col items-start mt-5 gap-5 max-w-md mx-auto md:max-w-2xl m-5 px-4 relative">
        <div>
          <Menu
            onDateBtnClick={onDateBtnClick}
            periodText={dateTextRef.current}
          />
          <div className="absolute left-0 end-0 z-20">
            <Calendar
              show={isCalendarShow ? "block" : "hidden"}
              onResetClick={handleResetClick}
              onDateChange={handleDateChangeClick}
              selectedDate={selectedDate}
            />
          </div>
        </div>
        <h1 className="text-[#9ca3af] text-xl p-2">Public</h1>
      </div>
      {isDataExist ? (
        transactionsSorted &&
        transactionsSorted.map((transaction) => {
          return (
            <TransactionCard
              key={transaction.transaction_id}
              id={transaction.transaction_id}
              userSender={transaction.sender}
              recipient={transaction.recipient}
              eventType={transaction.type}
              amount={transaction.amount}
              note={transaction.note}
              pendingStatus={transaction.pendingStatus}
              timestamp={transaction.timestamp}
            />
          );
        })
      ) : (
        <Spinner />
      )}
      <img className="mx-auto md:max-w-2xl" src={transactionLogo} alt="" />
    </NavbarContainer>
  );
}

export default Home;
