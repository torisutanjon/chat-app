"use client";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import Image from "next/image";
import loading_gif from "../assets/loading.gif";
import { accountAPI } from "../api";

interface UserTypes {
  userid: string;
  email: string;
  username: string;
  verificationStatus: boolean;
}

const Profile = () => {
  const [token, setToken] = useState<UserTypes>();
  const [component, setComponent] = useState(<></>);

  const loadingComponent = () => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[32px] font-bold text-black/50">
          Sending Verification
        </p>
        <div className="relative h-[125px] w-[125px] bg-black/50 mt-[15px] flex items-center justify-center">
          <Image src={loading_gif} alt="" height={100} width={100} />
        </div>
      </div>
    );
  };
  const verifyEmailHandler = async () => {
    try {
      setComponent(() => loadingComponent());
      if (token === undefined) return;
      await accountAPI.sendVerification(token.userid, token.email);
    } catch (error) {
      window.alert(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    window.alert("Logout Successfully");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      window.alert("No user token found");
      localStorage.removeItem("userToken");
      window.location.href = "/";
    } else {
      const decodedToken: any = jwt(token);
      setToken({
        userid: decodedToken.user_id,
        email: decodedToken.user_email,
        username: decodedToken.username,
        verificationStatus: decodedToken.verification_status,
      });
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
      {token === undefined ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <div className="relative h-[50%] w-[75%] flex flex-col items-center justify-evenly">
            <p className="text-[24px] text-[#7AC74F]/75 font-bold">
              {token.username.toLocaleUpperCase()}
            </p>
            <div className="relative h-[45%] w-full flex flex-col items-center justify-end">
              {token.verificationStatus === false && (
                <button
                  className="relative text-[18px] text-black/50 mb-[15px] md:h-[35px] md:w-[150px] md:rounded-[25px] md:bg-[#7AC74F] md:text-[14px] md:text-white/75"
                  onClick={() => verifyEmailHandler()}
                >
                  Verify Email
                </button>
              )}
              <button
                className="relative text-[18px] text-black/50 mb-[15px] md:h-[35px] md:w-[150px] md:rounded-[25px] md:bg-[#7AC74F] md:text-[14px] md:text-white/75"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </button>
              <button
                className="relative text-[18px] text-[#E87461] mb-[15px] md:h-[35px] md:w-[150px] md:rounded-[25px] md:bg-[#E87461] md:text-[14px] md:text-white/75"
                onClick={() => logoutHandler()}
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
      {component}
    </div>
  );
};

export default Profile;
