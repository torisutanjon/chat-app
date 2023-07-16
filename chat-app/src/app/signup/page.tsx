"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";
import { accountAPI } from "../api";
import { useMediaQuery } from "react-responsive";

const SignUpPage = () => {
  const [component, setComponent] = useState(<></>);
  const [responsiveComponent, setResponsiveCOmponent] = useState(<></>);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px )",
  });

  const loadingComponent = () => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[32px] font-bold text-black/50">Create Account..</p>
        <div className="relative h-[125px] w-[125px] mt-[15px] flex items-center justify-center">
          <Image src={loading_gif} alt="" height={100} width={100} />
        </div>
      </div>
    );
  };

  const createAccountHandler = async () => {
    setComponent(() => loadingComponent());
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = document.getElementById("email-input") as HTMLInputElement;
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;
    const confirmpassword = document.getElementById(
      "cpassword-input"
    ) as HTMLInputElement;

    if (
      email.value === "" ||
      username.value === "" ||
      password.value === "" ||
      confirmpassword.value === ""
    ) {
      setComponent(<></>);
      return window.alert("Please fill all fields");
    }

    if (password.value !== confirmpassword.value) {
      setComponent(<></>);
      return window.alert("Password not matched!");
    }

    if (!email.value.toLowerCase().match(emailRegex)) {
      setComponent(<></>);
      return window.alert("Email is not valid");
    }

    try {
      await accountAPI.createAccount(
        email.value,
        username.value,
        password.value
      );
    } catch (error) {
      console.log(error);
    }
  };

  const clearHandler = () => {
    const email = document.getElementById("email-input") as HTMLInputElement;
    const username = document.getElementById(
      "username-input"
    ) as HTMLInputElement;
    const password = document.getElementById(
      "password-input"
    ) as HTMLInputElement;
    const confirmpassword = document.getElementById(
      "cpassword-input"
    ) as HTMLInputElement;

    email.value = "";
    username.value = "";
    password.value = "";
    confirmpassword.value = "";
  };

  useEffect(() => {
    if (isMobile)
      return setResponsiveCOmponent(
        <div className="relative h-full w-full flex flex-col items-center justify-center boxShadow2 rounded-[14px]">
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] my-[5px]">
            Email:
          </p>
          <input
            type="text"
            id="email-input"
            className="h-[30px] w-[75%] text-[14px] text-black/50 border-b-[2px] border-b-black/25 text-center outline-none focus:border-b-[3px]"
          />
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] my-[5px]">
            Username:
          </p>
          <input
            type="text"
            id="username-input"
            className="h-[30px] w-[75%] text-[14px] text-black/50 border-b-[2px] border-b-black/25 text-center outline-none focus:border-b-[3px]"
          />
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] my-[5px]">
            Password:
          </p>
          <input
            type="password"
            id="password-input"
            className="h-[30px] w-[75%] text-[14px] text-black/50 border-b-[2px] border-b-black/25 text-center outline-none focus:border-b-[3px]"
          />
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] my-[5px]">
            Confirm Password:
          </p>
          <input
            type="password"
            id="cpassword-input"
            className="h-[30px] w-[75%] text-[14px] text-black/50 border-b-[2px] border-b-black/25 text-center outline-none focus:border-b-[3px]"
          />
        </div>
      );
    return setResponsiveCOmponent(
      <div className="relative h-full w-[45%] flex flex-col items-start justify-evenly boxShadow2 rounded-[14px]">
        <div className="h-[25%] w-[80%] flex flex-row items-center justify-end">
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] mr-[5px]">
            Email:
          </p>
          <input
            type="text"
            id="email-input"
            className="h-[35px] w-[275px] border-b-[1px] border-b-black/25 text-[13px] text-black/50 pl-[10px] outline-none focus:border-b-[2px]"
          />
        </div>
        <div className="h-[25%] w-[80%] flex flex-row items-center justify-end">
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] mr-[5px]">
            Username:
          </p>
          <input
            type="text"
            id="username-input"
            className="h-[35px] w-[275px] border-b-[1px] border-b-black/25 text-[13px] text-black/50 pl-[10px] outline-none focus:border-b-[2px]"
          />
        </div>
        <div className="h-[25%] w-[80%] flex flex-row items-center justify-end">
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] mr-[5px]">
            Password:
          </p>
          <input
            type="password"
            id="password-input"
            className="h-[35px] w-[275px] border-b-[1px] border-b-black/25 text-[13px] text-black/50 pl-[10px] outline-none focus:border-b-[2px]"
          />
        </div>
        <div className="h-[25%] w-[80%] flex flex-row items-center justify-end">
          <p className="text-[#313131]/75 p-0 m-0 text-[14px] mr-[5px]">
            Confirm Password:
          </p>
          <input
            type="password"
            id="cpassword-input"
            className="h-[35px] w-[275px] border-b-[1px] border-b-black/25 text-[13px] text-black/50 pl-[10px] outline-none focus:border-b-[2px]"
          />
        </div>
      </div>
    );
  }, []);

  return (
    <div className="relative left-0 top-0 h-screen w-screen flex items-center justify-center">
      <div className="relative h-[80%] w-[80%] flex flex-col items-center justify-between">
        <p className="text-[24px] text-[#7AC74F]/75 font-bold  md:text-[14px]">
          Create Account
        </p>
        <div className="relative h-[50%] w-full flex flex-col items-center justify-between">
          {responsiveComponent}
        </div>
        <Link href="/login" className="text-[12px] text-black/50 underline">
          Already have an account?
        </Link>
        <div className="h-[20%] w-full flex flex-row items-center justify-between md:h-[25%] md:w-[35%]">
          <button
            className="h-[30px] w-[75px] boxShadow2 text-[12px] bg-white rounded-[25px] text-black/75 md:h-[35px] md:w-[150px]"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
          <button
            className="h-[30px] w-[75px] boxShadow2 text-[12px] bg-[#7AC74F] rounded-[25px] text-black/75 md:h-[35px] md:w-[150px]"
            onClick={() => createAccountHandler()}
          >
            Sign Up
          </button>
          <button
            className="h-[30px] w-[75px] boxShadow2 text-[12px] bg-[#1E1E1E]/75 rounded-[25px] text-white/75 md:h-[35px] md:w-[150px]"
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

export default SignUpPage;
