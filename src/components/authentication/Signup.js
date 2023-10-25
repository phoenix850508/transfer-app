import React from "react";
import { useNavigate } from "react-router-dom";
import rwaLogo from "icons/rwa-logo.svg";

function Signup() {
  const navigate = useNavigate();
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
            <div className="mt-4 space-y-8">
              <div className="space-y-6">
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                />
                <input
                  className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                  placeholder="Confirm Password"
                  type="password"
                  name="password"
                  id="password"
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
              <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
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
