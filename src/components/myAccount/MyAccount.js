import React, { useEffect, useState } from "react";
import setting from "icons/undraw_personal_settings_kihd.svg";
import NavbarContainer from "components/container/NavbarContainer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "utils/firebase";

function MyAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [accountNumber, setAccountNumber] = useState(null);
  // 從fireStore取得user
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userData = await getDoc(doc(db, "users", user.uid));
        setAccountNumber(userData.data().account_number);
      }
    };
    fetchUser().catch((error) => console.error(error));
  }, [user]);
  return (
    <NavbarContainer>
      <div className="grid sm:grid-cols-1 sm:grid-rows-4 md:grid-cols-3 md:grid-rows-1 sm:gap-5 md:gap-10 sm:mt-5 md:mt-20 m-5">
        <img src={setting} alt="" />
        <div className="col-span-2 row-span-3 sm:p-2 md:p-5 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-6 text-[#64748b]">
          <div className="w-full flex flex-col items-start gap-2">
            <label>User ID</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="user id"
              value={user.uid}
              disabled
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>User name</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="User name"
              value={user.displayName}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Email</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Photo URL</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="photo url"
              value={user.providerData[0].photoURL}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <label>Account number</label>
            <input
              className="border-2 p-2 w-full"
              type="text"
              placeholder="account number"
              value={accountNumber}
              disabled
            />
          </div>
        </div>
      </div>
    </NavbarContainer>
  );
}

export default MyAccount;
