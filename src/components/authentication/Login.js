import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import rwaLogo from "icons/transfer-logo.svg";
import { app } from "utils/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import ToastAlert from "./toasts/ToastAlert";
import clsx from "clsx";

function Login() {
  const navigate = useNavigate();
  const [isAlertShow, setIsAlertShow] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth(app);

  // 點擊登入按鈕
  const handleLogIn = (e) => {
    // 排除錯誤
    e.preventDefault();
    if (
      emailRef.current.value.trim().length === 0 ||
      passwordRef.current.value.trim().length === 0
    )
      return;
    // 登入
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value,
    )
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        setIsAlertShow(true);
        console.error(error);
      });
  };

  // 檢查使用者是登入裝態
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 若初次登入，跳轉到編輯名字ProfileInit
        if (!user.providerData[0].displayName) {
          navigate("/profile/inialize");
          // 若非初次登入，跳轉到Home
        } else {
          navigate("/home");
        }
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
      <form action="">
        <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
          <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900 relative">
            <div>
              <img className="w-full mb-4" src={rwaLogo} alt="rwaLogo" />
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Login to your account
              </h1>
              <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                Don't have an account ?{" "}
                <span
                  className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </span>{" "}
                for free
              </p>
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
                  errorMessage="invalid email or password"
                  onCloseClick={() => setIsAlertShow(false)}
                />
              </div>
            </div>
            <div className="mt-8 space-y-8">
              <div className="space-y-6">
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Your Email"
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Your Password"
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                />
              </div>
              <button
                className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                onClick={handleLogIn}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
