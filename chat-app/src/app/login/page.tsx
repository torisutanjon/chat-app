"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import loading_gif from "../assets/loading.gif";
import { accountAPI } from "../api";

interface UserInfoTypes {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    username: "",
    password: "",
  });
  const [component, setComponent] = useState(<></>);

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

  const inputOnchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginHandler = async () => {
    if (userInfo.username === "" || userInfo.password === "")
      return window.alert("Please fill all fields");

    try {
      setComponent(() => loadingComponent());
      await accountAPI.loginAccount(userInfo.username, userInfo.password);
    } catch (error) {
      console.log(error);
    }
  };

  const clearHandler = () => {
    setUserInfo({
      username: "",
      password: "",
    });
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div className="relative h-[70%] w-[80%] flex flex-col items-center justify-between">
        <p className="text-[#313131]/25 text-[24px] font-bold">Login Account</p>
        <div className="relative h-[20%] w-full flex flex-col items-center justify-between">
          <p className="text-[16px] text-[#313131]/75 p-0 m-0">
            Email or Username:
          </p>
          <input
            type="text"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
            name="username"
            onChange={inputOnchangeHandler}
            value={userInfo.username}
          />
          <p className="text-[16px] text-[#313131]/75">Password:</p>
          <input
            type="password"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
            name="password"
            onChange={inputOnchangeHandler}
            value={userInfo.password}
          />
        </div>
        <Link href="/signup" className="text-[12px] text-black/50 underline">
          Create Account
        </Link>
        <div className="h-[20%] w-full flex flex-col items-center justify-end">
          <button
            className="h-[30px] w-[125px] border-[1px] border-black/75 rounded-[50px] text-[12px] mb-[15px]"
            onClick={() => loginHandler()}
          >
            Login
          </button>
          <button
            className="h-[30px] w-[125px] border-[1px] border-black/75 rounded-[50px] text-[12px] mb-[15px]"
            onClick={() => clearHandler()}
          >
            Clear
          </button>
          <button
            className="h-[30px] w-[125px] border-[1px] border-black/75 rounded-[50px] text-[12px]"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </div>
      {component}
    </div>
  );
};

export default LoginPage;
