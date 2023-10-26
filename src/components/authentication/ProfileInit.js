import { getAuth, updateProfile, signOut } from "firebase/auth";
import { app } from "utils/firebase";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ToastInfo from "./toasts/ToastInfo";
import ToastSuccess from "./toasts/ToastSuccess";

function ProfileInit() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const handleContinueClick = (e) => {
    e.preventDefault();
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const randNum = Math.floor(Math.random() * 900) + 100;
    const photoDefault = `https://i.pravatar.cc/${randNum}`;
    // 排除錯誤
    if (firstName.trim() === 0 || lastName.trim().length === 0) return;
    updateProfile(auth.currentUser, {
      displayName: lastName + " " + firstName,
      photoURL: photoDefault,
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

export default ProfileInit;
