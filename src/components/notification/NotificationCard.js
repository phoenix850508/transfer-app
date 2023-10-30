import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "components/buttons/Button";
import { doc, updateDoc } from "firebase/firestore";
import {
  userBalanceDecrement,
  userBalabceIncrement,
} from "components/newTransaction/NewTransactionForm";
import { useDispatch, useSelector } from "react-redux";
import { BALANCE_DECREMENT } from "components/redux/balance/balanceSlice";
import { db } from "utils/firebase";
import ToastAlert from "components/authentication/toasts/ToastAlert";

function NotificationCard({
  id,
  userId,
  userSender,
  senderAccount,
  recipient,
  eventType,
  amount,
  note,
  pendingStatus,
  timestamp,
}) {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [status, setStatus] = useState(pendingStatus);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const notificationRef = doc(db, "users/notifications_doc/notifications", id);
  const dispatch = useDispatch();
  const date = timestamp.toDate().toString();
  const balanceValue = useSelector((state) => state.balance.value);

  // 若點擊request的Pay按鈕
  const handlePayClick = async (e) => {
    e.preventDefault();

    // 若餘額不足以支付
    if (balanceValue < amount) {
      setIsAlertShow(true);
      seterrorMsg("insufficient balance");
      return;
    }
    setIsButtonShow(false);
    setStatus("done");

    // 更新request payment balance資訊
    userBalanceDecrement(recipient.account_number, amount);
    userBalabceIncrement(senderAccount, amount);

    // 更新client-side user balance資訊
    dispatch(BALANCE_DECREMENT(amount));

    // 更新notification資料
    await updateDoc(notificationRef, {
      pendingStatus: "done",
    });
  };

  // 若點擊request的Cancel按鈕
  const handleCancelClick = async (e) => {
    e.preventDefault();
    setIsCanceled(true);
    setIsButtonShow(false);
    setStatus("rejected");

    // 更新notification資料
    await updateDoc(notificationRef, {
      pendingStatus: "rejected",
    });
  };

  useEffect(() => {
    // 若此request已經解決，cross out字樣並隱藏按鈕
    if (status === "rejected" && eventType === "request") {
      setIsCanceled(true);
      setIsButtonShow(false);
    } else if (
      // 若request已經被解決，或者發出人為自己，按鈕不該顯示
      (status === "done" && eventType === "request") ||
      (status === "pending" &&
        eventType === "request" &&
        userSender.uid === userId)
    ) {
      setIsButtonShow(false);
    } else if (
      // 若使用者為request接收人，顯示按鈕
      status === "pending" &&
      eventType === "request" &&
      recipient.userId === userId
    ) {
      setIsButtonShow(true);
    }
  }, [eventType, status]);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div className="p-8 flex gap-5">
        <div className="relative">
          <img
            className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
            src={userSender.photoURL}
            alt=""
          />
          <img
            className="h-6 w-6 cursor-pointer rounded-full object-cover object-center absolute top-6 right-0 border-2 border-[white]"
            src={recipient.photoURL}
            alt=""
          />
        </div>
        <div className="text-start">
          <div
            className={clsx("tracking-wide text-lg", {
              "line-through": isCanceled,
            })}
          >
            <span className="text-indigo-500">{userSender.displayName}</span>{" "}
            {eventType === "pay" ? "paid" : "requested"}{" "}
            <span className="text-indigo-500">{recipient.name}</span>
          </div>
          <p className="mt-2 text-gray-500">TransactionId: {id}</p>
          <p className="mt-2 text-gray-500">Note: {note}</p>
          <p className="mt-2 text-gray-500">Status: {status}</p>
          <p className="mt-2 text-gray-500">{date}</p>
        </div>
        <div
          className={clsx(
            "grow flex justify-end items-center gap-3 pr-4 text-xl",
            {
              // 若使用者為付款接收人/請款發起人，顯示綠色(正)
              "text-[green]":
                (eventType === "request" && recipient.userId !== userId) ||
                (eventType === "pay" && recipient.userId === userId),
            },
            {
              // 若使用者為付款發起人/請款接收人，顯示紅(負)
              "text-[red]":
                (eventType === "request" && recipient.userId === userId) ||
                (eventType === "pay" && recipient.userId !== userId),
            },
            {
              // 若使用者為請款接收人，且status為pending，顯示灰色
              "text-gray-300":
                status === "pending" &&
                eventType === "request" &&
                userSender.uid,
            },
          )}
        >
          {isButtonShow && eventType === "request" && (
            <div className="relative flex gap-2">
              <div
                className={clsx(
                  {
                    "block absolute z-20 top-0 -translate-y-full": isAlertShow,
                  },
                  { hidden: !isAlertShow },
                )}
              >
                <ToastAlert
                  errorMessage={errorMsg}
                  onCloseClick={() => setIsAlertShow(false)}
                />
              </div>
              <Button onButtonClick={handlePayClick} buttonText="Pay" />
              <Button
                onButtonClick={handleCancelClick}
                buttonText="Cancel"
                action="cancel"
              />
            </div>
          )}
          <span className={clsx({ "line-through": isCanceled })}>
            {(eventType === "request" && recipient.userId === userId) ||
            (eventType === "pay" && recipient.userId !== userId)
              ? `-${amount}`
              : amount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
