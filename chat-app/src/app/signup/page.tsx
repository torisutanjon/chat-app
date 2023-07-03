"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";
import { accountAPI } from "../api";

const SignUpPage = () => {
  const [component, setComponent] = useState(<></>);

  const loadingComponent = () => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[32px] font-bold text-black/50">Create Account..</p>
        <div className="relative h-[125px] w-[125px] bg-black/50 mt-[15px] flex items-center justify-center">
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
  return (
    <div className="relative left-0 top-0 h-screen w-screen flex items-center justify-center">
      <div className="relative h-[70%] w-[80%] flex flex-col items-center justify-between">
        <p className="text-[24px] text-[#313131]/25 font-bold">
          Create Account
        </p>
        <div className="relative h-[50%] w-full flex flex-col items-center justify-between">
          <p className="text-[16px] text-[#313131]/75 p-0 m-0">Email:</p>
          <input
            type="text"
            id="email-input"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
          />
          <p className="text-[16px] text-[#313131]/75 p-0 m-0">Username:</p>
          <input
            type="text"
            id="username-input"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
          />
          <p className="text-[16px] text-[#313131]/75 p-0 m-0">Password:</p>
          <input
            type="password"
            id="password-input"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
          />
          <p className="text-[16px] text-[#313131]/75 p-0 m-0">
            Confirm Password:
          </p>
          <input
            type="password"
            id="cpassword-input"
            className="h-[35px] w-full border-b-[1px] border-b-black/75 text-center outline-none"
          />
        </div>
        <Link href="/login" className="text-[12px] text-black/50 underline">
          Already have an account?
        </Link>
        <div className="h-[20%] w-full flex flex-col items-center justify-between">
          <button
            className="h-[30px] w-[125px] border-[1px] border-black/75 rounded-[50px] text-[12px] mb-[15px]"
            onClick={() => createAccountHandler()}
          >
            Create Account
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

export default SignUpPage;
