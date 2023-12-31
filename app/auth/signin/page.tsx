"use client" 
import { signIn } from "next-auth/react";
import React from "react";

export default function Component() {
  const userName = React.useRef("");
  const pass = React.useRef("");

  const onSubmit = async (e:any) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
    });
    console.log(result)
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            เข้าสู่ระบบ
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                รหัสพนักงาน
              </label>
              <input
                type="text"
                onChange={(e) => (userName.current = e.target.value)}
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="pass"
                onChange={(e) => (pass.current = e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              onClick={onSubmit}
              className="w-full mt-10 dark:text-white  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
