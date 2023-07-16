"use client";

import jwt from "jwt-decode";
import { useEffect } from "react";
interface PropTypes {
  sender_id: string;
  sendername: string;
  message: string;
}

const MessageComponent = ({ sender_id, sendername, message }: PropTypes) => {
  const token = localStorage.getItem("userToken");
  const decodedToken: any = jwt(token!);
  let isUser = false;
  if (decodedToken.user_id === sender_id) {
    isUser = true;
  }

  return (
    <div className="relative w-[95%] m-[2.5%] my-[0] flex flex-col justify-start">
      <div
        className={`relative h-full max-w-[75%] mx-[5%] my-[2.5%] flex flex-col ${
          isUser === false ? "self-start" : "self-end"
        }`}
      >
        {isUser === false ? (
          <p className="text-[12px] text-black/75 self-start text-white/50">
            {sendername}
          </p>
        ) : (
          <></>
        )}
        <div
          className={`h-auto max-w-[150px] text-white text-[12px] p-[15px] text-normal rounded-[8px] wordBreak md:max-w-[450px] md:text-[14px] ${
            isUser === false ? "bg-[#3E3E3E]" : "bg-[#7AC74F]"
          }`}
        >
          {message}
        </div>
        <div className="clearBreak"></div>
      </div>
    </div>
  );
};

export default MessageComponent;
