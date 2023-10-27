import Button from "components/buttons/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "utils/firebase";
import FilterdUsers from "./FilterdUsers";
import clsx from "clsx";

function NewTransactionForm({ onContactClick, onPaymentClick, step }) {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

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
          onContactClick={onContactClick}
          users={users}
          keyword={keyword}
        />
      </div>
      <div
        className={clsx("form-row flex flex-col items-center gap-3", {
          hidden: step !== "payment",
        })}
      >
        <div className="w-full flex flex-col gap-3 items-center text-[#0000AE] font-semibold sm:text-sm md:text-xl word-break">
          <img
            className="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
            src="https://placedog.net/210"
            alt=""
          />
          <span>John Doe</span>
        </div>
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Amount"
        />
        <input
          className="border-2 p-2 w-full"
          type="text"
          placeholder="Add a note"
        />
        <div className="sm:gap-4 md:gap-6 grid grid-cols-2">
          <Button
            onButtonClick={(e) => {
              e.preventDefault();
              onPaymentClick();
            }}
            buttonText="REQUEST"
          />
          <Button
            onButtonClick={(e) => {
              e.preventDefault();
              onPaymentClick();
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
          <span>John Doe</span>
        </div>
        <p className="mt-10">Requested $3.00 for xxxasdasdasdas</p>
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
            onClick={() => {
              navigate("/transaction/new");
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
