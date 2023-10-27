import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import rwaLogo from "icons/rwa-logo.svg";
import { app } from "utils/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import ToastAlert from "./toasts/ToastAlert";
import clsx from "clsx";

function Signup() {
  ("invalid-email");
  ("weak-password");
  ("email-already-in-use");
  const navigate = useNavigate();
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(app);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // 點擊註冊按鈕
  const handleSignupClick = (e) => {
    console.log(auth);
    e.preventDefault();
    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setIsAlertShow(true);
      setErrorMessage(
        "entered password does not match with the confirm password",
      );
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then((userCredential) => {
        navigate("/login");
      })
      .catch((error) => {
        setIsAlertShow(true);
        console.error(error);
        // 顯示錯誤訊息
        const errorToString = JSON.stringify(error);
        if (errorToString.includes("invalid-email"))
          setErrorMessage("invalid-email");
        else if (errorToString.includes("weak-password"))
          setErrorMessage("Password should be at least 6 characters");
        else if (errorToString.includes("email-already-in-use"))
          setErrorMessage("email-already-in-use");
      });
  };

  // 檢查使用者是否已經登入
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
      <form action="">
        <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
            <div>
              <img className="w-full mb-4" src={rwaLogo} alt="rwaLogo" />
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Sign up new account
              </h1>
            </div>
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
                errorMessage={errorMessage}
                onCloseClick={() => setIsAlertShow(false)}
              />
            </div>
            <div className="mt-4 space-y-8">
              <div className="space-y-6">
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  ref={confirmPasswordRef}
                />
              </div>
              <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                Already have an account ?{" "}
                <span
                  className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  login
                </span>{" "}
              </p>
              <button
                className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                onClick={handleSignupClick}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
