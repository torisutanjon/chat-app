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
    <div className="relative max-h-[150px] w-[95%] m-[2.5%] flex flex-col justify-start">
      <div
        className={`relative h-full max-w-[75%] mx-[5%] my-[2.5%] flex flex-col ${
          isUser === false ? "self-start" : "self-end"
        }`}
      >
        <p
          className={`${
            isUser === false ? "self-start" : "self-end"
          } font-bold text-[16px] text-black/75`}
        >
          {sendername}
        </p>
        <div className="max-w-[150px] text-[#E0C879] text-[14px] p-[15px] md:max-w-[450px]">
          {message}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
