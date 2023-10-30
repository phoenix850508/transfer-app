import { getAuth, updateProfile, signOut } from "firebase/auth";
import { app, db } from "utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ToastInfo from "./toasts/ToastInfo";
import ToastSuccess from "./toasts/ToastSuccess";
import { doc, setDoc } from "firebase/firestore";
import avatar_default from "icons/default_avatar.jpeg";

function ProfileInit() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const navigate = useNavigate();

  // 取出既有使用者資料
  const auth = getAuth(app);
  const user = auth.currentUser;

  // 點擊Continue按鈕，儲存使用者資訊到Auth和Cloud Firestore
  const handleContinueClick = async (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const photoDefault = avatar_default;
    // 排除錯誤
    if (firstName.trim() === 0 || lastName.trim().length === 0) return;

    // 幫使用者產生account_number，並加入到Firestore
    const account_number = accountNumberGenerator();
    await setDoc(doc(db, `users/accounts_doc/accounts/${account_number}`), {
      userId: user.uid,
      balance: 0,
    });

    // 找出firestorage檔案相對路徑
    const storage = getStorage(app);
    const storageRef = ref(storage, "images/default_pig.png");
    const url = await getDownloadURL(storageRef);

    // 將使用者個人資料加入FireStore
    await setDoc(doc(db, "users", `${user.uid}`), {
      userId: user.uid,
      name: firstName + " " + lastName,
      photoURL: url,
      email: user.email,
      account_number,
    });

    // 更新Auth中profile資料
    updateProfile(auth.currentUser, {
      displayName: firstName + " " + lastName,
      photoURL: url,
    })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
      <form action="">
        <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
            <div>
              <div className="flex justify-start">
                <i className="fa-solid fa-user fa-2xl group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 min-w-max  hover:text-cyan-600"></i>
                <h2 className="text-2xl font-semibold">Create Profile</h2>
              </div>
              <div className="w-full my-3">
                <ToastSuccess infoMessage={`Welcome ${user?.email}!`} />
                <ToastInfo infoMessage={"Please enter your name below"} />
              </div>
            </div>
            <div className="mt-4 space-y-8">
              <div className="space-y-6">
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  id="firstName"
                  ref={firstNameRef}
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                  ref={lastNameRef}
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                  onClick={handleContinueClick}
                >
                  Continue
                </button>
                <button
                  className="h-9 px-3 w-full bg-gray-600 hover:bg-gray-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                  onClick={handleLogOut}
                >
                  Quit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function accountNumberGenerator() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const numLength = numbers.length;
  let account_number = "";
  const digits = 13;
  for (let i = 0; i < digits; i++) {
    const randIndex = Math.floor(Math.random() * numLength);
    account_number += numbers[randIndex].toString();
  }
  return account_number;
}

export default ProfileInit;
