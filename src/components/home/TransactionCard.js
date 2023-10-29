import React, { useEffect, useState } from "react";
import clsx from "clsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

function TransactionCard({
  id,
  userSender,
  recipient,
  eventType,
  amount,
  note,
  pendingStatus,
  timestamp,
}) {
  const [isCanceled, setIsCanceled] = useState(false);
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-CH");
  const date = timeAgo.format(
    Date.now() - (Date.now() - timestamp.seconds * 1000),
  );
  useEffect(() => {
    if (pendingStatus === "rejected") {
      setIsCanceled(true);
    }
  }, []);
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
          <p className="mt-2 text-gray-500">Status: {pendingStatus}</p>
          <p className="mt-2 text-gray-500">{date}</p>
        </div>
        <div
          className={clsx(
            "grow flex justify-end items-center gap-3 pr-4 text-xl",
            { "text-gray-300": pendingStatus === "pending" },
          )}
        >
          <span className={clsx({ "line-through": isCanceled })}>
            ${amount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
