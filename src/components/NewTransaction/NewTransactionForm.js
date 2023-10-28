import Button from "components/buttons/Button";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
import FilterdUsers from "./FilterdUsers";
import clsx from "clsx";
import { BALANCE_DECREMENT } from "components/redux/balance/balanceSlice";
import { doc, updateDoc, increment } from "firebase/firestore";
import ToastAlert from "components/authentication/toasts/ToastAlert";

function NewTransactionForm({
  onContactClick,
  onPaymentClick,
  step,
  onNewTransactionClick,
}) {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [amountState, setAmountState] = useState("");
  const [noteState, setNoteState] = useState("");
  const amountRef = useRef(null);
  const noteRef = useRef(null);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balanceValue = useSelector((state) => state.balance.value);

  // 從localStorage中取出user資料
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.uid;
  const userEmail = user.email;

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePaymentClick = async (e, btnText) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    const note = noteRef.current.value;
    setAmountState(amount);
    setNoteState(note);
    // 除錯，若input為空 讓click無效
    if (amount.trim().length === 0 || note.trim().length === 0) {
      setIsAlertShow(true);
      seterrorMsg("amount or note field cannot be empty");
      return;
    }
    // amount不可為負數
    if (parseInt(amount) <= 0) {
      setIsAlertShow(true);
      seterrorMsg("amount cannot be lower or equals to 0");
      return;
    }
    // 若使用者按下PAY按鈕
    if (btnText === "pay") {
      // 若balance金額不足，顯示錯誤
      if (balanceValue < parseInt(amount)) {
        setIsAlertShow(true);
        seterrorMsg("insufficient balance");
        return;
      }
      // 改變fireStore payer和payee資料
      // payer 付款人
      await updateDoc(doc(db, `users/accounts_doc/accounts/${userAccount}`), {
        balance: increment(-parseInt(amount)),
      });

      // payee 取款人
      await updateDoc(
        doc(db, `users/accounts_doc/accounts/${selectedUser.account_number}`),
        {
          balance: increment(parseInt(amount)),
        },
      );

      // 改變client-side資料 即時顯示正確的balance
      dispatch(BALANCE_DECREMENT(amount));
    }
    onPaymentClick();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      // 取得所有Firestore的users
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers([]);
      querySnapshot.forEach((doc) => {
        // 若users中沒有該user資料
        const userData = doc.data();
        if (users && !users.some((user) => user.name === userData.name)) {
          setUsers((exustingUsers) => {
            return [...exustingUsers, userData];
          });
        }

        // 取得使用者account_number
        if (users && doc.id === userId) {
          setUserAccount(userData.account_number);
        }
      });
    };
    fetchUsers();
  }, []);
  return (
    <form>
      <div className={clsx("form-row", { hidden: step !== "contact" })}>
        <input
          className="w-full border-2 p-2 mb-3"
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <FilterdUsers
          onContactClick={(user) => {
            onContactClick();
            handleUserClick?.(user);
          }}
          users={users}
          keyword={keyword}
          currentUserEmail={userEmail}
        />
      </div>
      <div
        className={clsx("form-row flex flex-col items-center gap-3", {
          hidden: step !== "payment",
        })}
      >
        <div
          className={clsx(
            { "hidden absolute opacity-0": !isAlertShow },
            {
              "block flex justify-center max-w-lg mt-5 transition-opacity delay-200 duration-700 opacity-100 z-10":
                isAlertShow,
            },
          )}
        >
          <ToastAlert
            errorMessage={errorMsg}
            onCloseClick={() => setIsAlertShow(false)}
          />
        </div>
        <div className="w-full flex flex-col gap-3 items-center text-[#0000AE] font-semibold sm:text-sm md:text-xl word-break">
          <img
            className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
            src={selectedUser && selectedUser.photoURL}
            alt=""
          />
          <span>{selectedUser && selectedUser.name}</span>
        </div>
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Amount"
          ref={amountRef}
        />
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Add a note"
          ref={noteRef}
        />
        <div className="sm:gap-4 md:gap-6 grid grid-cols-2">
          <Button
            onButtonClick={(e) => {
              handlePaymentClick?.(e, "request");
              setAction("requested");
            }}
            buttonText="REQUEST"
          />
          <Button
            onButtonClick={(e) => {
              handlePaymentClick?.(e, "pay");
              setAction("paid");
            }}
            buttonText="PAY"
          />
        </div>
      </div>
      <div
        className={clsx(
          "form-row flex flex-col items-center gap-7 text-[#0000AE] font-semibold sm:text-sm md:text-xl word-break py-7",
          { hidden: step !== "complete" },
        )}
      >
        <div className="w-full flex flex-col gap-3 items-center">
          <img
            className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
            src="https://placedog.net/210"
            alt=""
          />
          <span>{selectedUser && selectedUser.name}</span>
        </div>
        <p className="mt-10">
          Successfully {action && action} ${amountState && amountState}.00 for{" "}
          {noteState && noteState}
        </p>
        <div className="w-full flex flex-col gap-2">
          <button
            className="bg-[#e5e7eb] text-[#0f172a] rounded-md p-2 sm:text-xs md:text-sm"
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            RETURN HOME
          </button>
          <button
            className="bg-[#e5e7eb] text-[#0f172a] rounded-md p-2 sm:text-xs md:text-sm"
            onClick={(e) => {
              onNewTransactionClick?.(e);
              amountRef.current.value = "";
              noteRef.current.value = "";
            }}
          >
            NEW TRANSACTION
          </button>
        </div>
      </div>
    </form>
  );
}

export default NewTransactionForm;
