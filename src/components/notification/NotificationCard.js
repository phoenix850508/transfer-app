import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "components/buttons/Button";
import { doc, updateDoc } from "firebase/firestore";
import {
  userBalanceDecrement,
  userBalabceIncrement,
} from "components/newTransaction/NewTransactionForm";
import { useDispatch } from "react-redux";
import { BALANCE_DECREMENT } from "components/redux/balance/balanceSlice";
import { db } from "utils/firebase";

function NotificationCard({
  id,
  userSender,
  senderAccount,
  recipient,
  eventType,
  amount,
  note,
  pendingStatus,
}) {
  const [isCanceled, setIsCanceled] = useState(false);
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [status, setStatus] = useState(pendingStatus);
  const notificationRef = doc(db, "users/notifications_doc/notifications", id);
  const dispatch = useDispatch();

  // 若點擊request的Pay按鈕
  const handlePayClick = async (e) => {
    e.preventDefault();
    setIsButtonClick(true);
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
    setIsButtonClick(true);
    setStatus("rejected");

    // 更新notification資料
    await updateDoc(notificationRef, {
      pendingStatus: "rejected",
    });
  };

  useEffect(() => {
    // 若此request已經解決，cross out字樣並隱藏按鈕
    if (
      (status === "done" || status === "rejected") &&
      eventType === "request"
    ) {
      setIsCanceled(true);
      setIsButtonClick(true);
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
          <p className="mt-2 text-gray-500">
            {eventType === "pay" ? "PaidId" : "RequestId"}: {id}
          </p>
          <p className="mt-2 text-gray-500">Note: {note}</p>
          <p className="mt-2 text-gray-500">Status: {status}</p>
        </div>
        <div
          className={clsx(
            "grow flex justify-end items-center gap-3 pr-4 text-xl",
            {
              "text-[green]": eventType === "pay",
            },
            { "text-[red]": eventType === "request" },
          )}
        >
          {!isButtonClick && eventType === "request" && (
            <>
              <Button onButtonClick={handlePayClick} buttonText="Pay" />
              <Button
                onButtonClick={handleCancelClick}
                buttonText="Cancel"
                action="cancel"
              />
            </>
          )}
          <span className={clsx({ "line-through": isCanceled })}>
            ${amount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
