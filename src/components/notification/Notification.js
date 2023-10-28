import NavbarContainer from "components/container/NavbarContainer";
import React, { useEffect, useState, useRef } from "react";
import MessageCards from "./MessageCards";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "utils/firebase";
import Spinner from "components/spinner/Spinner";
import NotificationCard from "./NotificationCard";

function Notification() {
  const [isDataExist, setIsDataExist] = useState(false);
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);

  // 從localStorage中取出user資料
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;

  useEffect(() => {
    // 找出得到錢的通知
    const fetchNotifications = async () => {
      const q = query(
        collection(db, "users/notifications_doc/notifications"),
        where("recipient.userId", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.recipient.userId === userId) {
          setNotifications((existingNoti) => {
            return [...existingNoti, docData];
          });
        }
      });
    };
    fetchNotifications();

    // loading圖示
    setTimeout(() => {
      setIsDataExist(true);
    }, 700);
  }, [userId]);
  return (
    <NavbarContainer>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-3xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
        <h1 className="text-[#0000AE] text-start">
          {notifications ? "Notifications" : "No notifications"}
        </h1>
        <div className="border-2 py-3">
          {isDataExist ? (
            notifications &&
            notifications.map((noti, index) => {
              return (
                <NotificationCard
                  key={index}
                  userSender={noti.sender}
                  eventType={noti.type}
                  amount={noti.amount}
                  note={noti.note}
                />
              );
            })
          ) : (
            <div className="mb-10">
              <Spinner />
            </div>
          )}
          <MessageCards />
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Notification;
