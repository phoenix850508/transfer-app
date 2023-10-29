import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "icons/default_avatar.jpeg";
import { app, db } from "utils/firebase";
import { signOut, getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_BALANCE } from "components/redux/balance/balanceSlice";
import clsx from "clsx";

function Dashboard() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [countPending, setCountPending] = useState(0);

  // 利用Hooks顯示redux state
  const balanceValue = useSelector((state) => state.balance.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // 登出
  const handleLogOut = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 儲存user資料在localStorage
  const userToString = user && JSON.stringify(user);
  user && localStorage.setItem("user", userToString);

  // 從localStorage取出資料
  const storageUser = JSON.parse(localStorage.getItem("user"));

  // 從fireStore取得user
  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userData = await getDoc(doc(db, "users", user.uid));
        const account_number = userData.data().account_number;
        const balance = await getDoc(
          doc(db, "users/accounts_doc/accounts", account_number),
        );
        // 利用Hooks來設定Firestore中的user account balance
        dispatch(FETCH_BALANCE(parseInt(balance.data().balance)));
      }
    };
    const fetchPendingCount = async () => {
      const q = query(
        collection(db, "users/notifications_doc/notifications"),
        where("pendingStatus", "==", "pending"),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.recipient.userId === user.uid) {
          setCountPending(countPending + 1);
        }
      });
    };
    fetchUser().catch((error) => console.error(error));
    fetchPendingCount().catch((error) => console.error(error));
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-100 sticky">
      <div className="sidebar min-h-screen w-[3.3rem] overflow-hidden border-r border-[#f3f4f6] bg-[#e2e8f0] sm:hover:w-48 md:hover:w-56 hover:bg-white hover:shadow-lg group sticky top-0 left-0 z-10">
        <div className="w-full flex h-screen flex-col justify-between pt-2 pb-6">
          <div className="w-full relative">
            <div className="w-max p-2.5">
              <div className="w-full flex items-center gap-2">
                <img
                  className="h-9 w-9 cursor-pointer rounded-full object-cover object-center"
                  src={
                    user
                      ? user.photoURL
                        ? user.photoURL
                        : avatar
                      : storageUser.photoURL
                  }
                  alt=""
                />
                <div className="flex flex-col items-start sm:text-xs md:text-base text-left">
                  <p className="sm:w-24 md:w-40 text-gray-600 break-words">
                    {user ? user.displayName : storageUser.displayName}
                  </p>
                  <p className="sm:w-24 md:w-40 text-gray-600 break-words">
                    {user ? user.email : storageUser.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pt-3 inline-block opacity-0 group-hover:opacity-100 font-semibold flex flex-col justify-start text-start text-lg text-gray-600">
              <span>${balanceValue}</span>
              <h2>Account Balance</h2>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide flex flex-col hover:cursor-pointer">
              <i
                className="fa-solid fa-house fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"
                onClick={() => navigate("/home")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Home
                </span>
              </i>
              <i
                className="fa-solid fa-user fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"
                onClick={() => navigate("/setting")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  My Account
                </span>
              </i>
              <i
                className="fa-solid fa-bell fa-sm group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max hover:text-cyan-600 relative"
                onClick={() => navigate("/notifications")}
              >
                <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                  Notification
                </span>
                <div
                  className={clsx(
                    "absolute",
                    { hidden: !countPending },
                    { block: countPending },
                  )}
                >
                  <p className="flex h-px w-px items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"></p>
                </div>
              </i>
            </ul>
          </div>
          <div className="w-max -mb-3">
            <i
              className="fa-solid fa-right-from-bracket group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max hover:cursor-pointer  hover:text-cyan-600"
              onClick={handleLogOut}
            >
              <span className="group flex items-center space-x-4 rounded-md px-6 py-3 text-gray-600 hover:text-cyan-600">
                Logout
              </span>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
