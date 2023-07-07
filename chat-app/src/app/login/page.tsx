"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import loading_gif from "../assets/loading.gif";
import { accountAPI } from "../api";
import { useMediaQuery } from "react-responsive";

interface UserInfoTypes {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [responsiveComponent, setResponsiveComponent] = useState(<></>);
  const [component, setComponent] = useState(<></>);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px )",
  });

  const loadingComponent = () => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[32px] font-bold text-black/50">Logging In</p>
        <div className="relative h-[125px] w-[125px] bg-black/50 mt-[15px] flex items-center justify-center">
          <Image src={loading_gif} alt="" height={100} width={100} />
        </div>
      </div>
    );
  };

  const loginHandler = async () => {
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;

    if (username.value === "" || password.value === "")
      return window.alert("Please fill all fields");

    try {
      setComponent(() => loadingComponent());
      await accountAPI.loginAccount(username.value, password.value);
    } catch (error) {
      console.log(error);
    }
  };

  const clearHandler = () => {
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;
    username.value = "";
    password.value = "";
  };

  useEffect(() => {
    if (isMobile)
      return setResponsiveComponent(
        <>
          <p className="text-[16px] text-black/50 p-0 m-0 md:text-[14px]">
            Email or Username:
          </p>
          <input
            type="text"
            className="h-[35px] w-[75%] border-b-[1px] border-b-black/25 text-center outline-none md:w-[350px] md:text-black/50 md:text-[14px]"
            name="username"
            id="username-input"
          />
          <p className="text-[16px] text-black/50 md:text-[14px]">Password:</p>
          <input
            type="password"
            className="h-[35px] w-[75%] border-b-[1px] border-b-black/25 text-center outline-none md:w-[350px] md:text-black/50 md:text-[14px]"
            name="password"
            id="password-input"
          />
        </>
      );
    return setResponsiveComponent(
      <>
        <div className="h-1/2 w-[30%] flex flex-row items-center justify-end">
          <p className="text-[16px] text-black/50 p-0 m-0 md:text-[14px] md:mr-[5px]">
            Email or Username:
          </p>
          <input
            type="text"
            className="h-[35px] w-[75%] border-b-[1px] border-b-black/25 text-center outline-none md:w-[200px] md:text-black/50 md:text-[14px] md:ml-[5px] md:text-start md:pl-[10px]"
            name="username"
            id="username-input"
          />
        </div>
        <div className="h-1/2 w-[30%] flex flex-row items-center justify-end">
          <p className="text-[16px] text-black/50 md:text-[14px] md:mr-[5px]">
            Password:
          </p>
          <input
            type="password"
            className="h-[35px] w-[75%] border-b-[1px] border-b-black/25 text-center outline-none md:w-[200px] md:text-black/50 md:text-[14px] md:ml-[5px] md:text-start md:pl-[10px]"
            name="password"
            id="password-input"
          />
        </div>
      </>
    );
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div className="relative h-[70%] w-[80%] flex flex-col items-center justify-between">
        <p className="text-[#7AC74F]/75 text-[24px] font-bold">Login Account</p>
        <div className="relative h-[20%] w-full flex flex-col items-center justify-between">
          {responsiveComponent}
        </div>
        <Link href="/signup" className="text-[12px] text-black/50 underline">
          Create Account
        </Link>
        <div className="h-[20%] w-full flex flex-row items-center justify-evenly md:h-[30%] md:w-[50%]">
          <button
            className=" text-[12px] font-bold text-black/50 mb-[15px] md:h-[35px] md:w-[150px] md:border-none md:bg-[#A1CF6B] md:rounded-[25px] md:text-white/75"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button
            className=" text-[12px] mb-[15px] font-bold text-black/50 md:h-[35px] md:w-[150px] md:border-none md:bg-[#A1CF6B] md:rounded-[25px] md:text-white/75"
            onClick={() => loginHandler()}
          >
            Login
          </button>
          <button
            className=" text-[12px] font-bold text-[#E87461] mb-[15px] md:h-[35px] md:w-[150px] md:border-none md:bg-[#E87461] md:rounded-[25px] md:text-white/75"
            onClick={() => clearHandler()}
          >
            Clear
          </button>
        </div>
      </div>
      {component}
    </div>
  );
};

export default LoginPage;
