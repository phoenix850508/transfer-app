import React from "react";
import TransactionCard from "./TransactionCard";
import Menu from "./Menu";
import Calendar from "./Calendar";
import { useState, useEffect } from "react";
import Spinner from "components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { app } from "utils/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "utils/firebase";
import NavbarContainer from "components/container/NavbarContainer";
import transactionLogo from "icons/undraw_transfer_money_rywa.svg";

function Home() {
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const onDateBtnClick = () => {
    setIsCalendarShow(!isCalendarShow);
  };
  const [isDataExist, setIsDataExist] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

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
  }, []);
  return (
    <NavbarContainer>
      <div className="flex flex-col items-start mt-5 gap-5 max-w-md mx-auto md:max-w-2xl m-5 px-4 relative">
        <div>
          <Menu onDateBtnClick={onDateBtnClick} />
          <div className="absolute left-0 end-0 z-20">
            <Calendar show={isCalendarShow ? "block" : "hidden"} />
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
