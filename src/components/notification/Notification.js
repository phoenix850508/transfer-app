import NavbarContainer from "components/container/NavbarContainer";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "utils/firebase";
import Spinner from "components/spinner/Spinner";
import NotificationCard from "./NotificationCard";
import messageLogo from "icons/undraw_reminders_697p.svg";

function Notification() {
  const [isDataExist, setIsDataExist] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const sortNotifictaion =
    notifications && notifications.sort((a, b) => b.timestamp - a.timestamp);
  // 從localStorage中取出user資料
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;

  useEffect(() => {
    // 所有得到的通知
    const fetchNotifications = async () => {
      // 寄給使用者的通知
      const q = query(
        collection(db, "users/notifications_doc/notifications"),
        where("recipient.userId", "==", userId),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.notification_id = doc.id;
        if (docData.recipient.userId === userId) {
          setNotifications((existingNoti) => {
            return [...existingNoti, docData];
          });
        }
      });

      // 使用者寄出的通知
      const qsend = query(
        collection(db, "users/notifications_doc/notifications"),
        where("sender.uid", "==", userId),
      );
      const querySendSnapshot = await getDocs(qsend);
      querySendSnapshot.forEach((doc) => {
        const docData = doc.data();
        docData.notification_id = doc.id;
        if (docData.sender.uid === userId) {
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
      <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mt-10 m-5 sm:p-2 md:p-5 flex flex-col gap-10">
        <h1 className="text-[#0000AE] text-start">
          {notifications.length ? "Notifications" : "No notifications"}
        </h1>
        <div className="border-2 p-3 border-[#e5e7eb]">
          {isDataExist ? (
            sortNotifictaion &&
            sortNotifictaion.map((noti) => {
              return (
                <NotificationCard
                  key={noti.notification_id}
                  id={noti.notification_id}
                  userId={userId}
                  userSender={noti.sender}
                  senderAccount={noti.sender_account_number}
                  recipient={noti.recipient}
                  eventType={noti.type}
                  amount={noti.amount}
                  note={noti.note}
                  pendingStatus={noti.pendingStatus}
                  timestamp={noti.timestamp}
                />
              );
            })
          ) : (
            <div className="mb-10">
              <Spinner />
            </div>
          )}
          <img src={messageLogo} alt="" />
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Notification;
