"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import jwt from "jwt-decode";
import { MessageComponent } from "@/components";

interface MessageTypes {
  sender_id: string;
  sendername: string;
  message: string;
}

const ChatComponent = ({ room_id }: { room_id: string }) => {
  const socket = io("http://localhost:5000");
  const [chats, setChats] = useState<MessageTypes[]>([]);

  socket.on("response-message", (message, sender_id, roomid, sendername) => {
    if (room_id === roomid) {
      // const chatHolder = ;
      setChats((chats) => [...chats, { sender_id, sendername, message }]);
    }
  });

  const clearHandler = () => {
    const message_input = document.getElementById(
      "message_input"
    ) as HTMLInputElement;

    message_input.value = "";
  };

  const sendMessageHandler = () => {
    const message_input = document.getElementById(
      "message_input"
    ) as HTMLInputElement;
    const token = localStorage.getItem("userToken");
    const decodedToken: any = jwt(token!);
    if (message_input.value === "")
      return window.alert("Can't send empty message");
    socket.emit(
      "send-message",
      message_input.value,
      room_id,
      decodedToken.user_id,
      decodedToken.username
    );
  };

  const connectHandler = async () => {
    try {
      socket.emit("join-room", room_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectHandler();
  }, [room_id]);

  return (
    <div className="relative h-[95%] w-full flex flex-col items-center justify-center">
      <div
        className={`absolute top-0 h-[80%] w-[90%] border-[1px] border-black/25 overflow-y-auto`}
        id="chat-container"
      >
        {chats.map((chat: MessageTypes, key) => {
          return (
            <MessageComponent
              key={key}
              sender_id={chat.sender_id}
              sendername={chat.sendername}
              message={chat.message}
            />
          );
        })}
      </div>
      <div className="absolute bottom-0 h-[15%] w-[90%] flex flex-col items-center justify-center">
        <input
          className="relative h-[40px] w-[90%] border-b-[1px] border-b-black/50 text-black/50 text-[12px] pl-[15px] outline-none"
          placeholder="Write a message"
          id="message_input"
        />
        <div className="relative self-end mr-[5%] h-[35px] w-[65%] flex flex-row items-center justify-between">
          <button
            className="h-[65%] w-[45%] rounded-[15px] border-[1px] text-[10px] text-black/50 border-black/50 outline-none"
            onClick={() => clearHandler()}
          >
            Clear
          </button>
          <button
            className="h-[65%] w-[45%] rounded-[15px] border-[1px] text-[10px] text-black/50 border-black/50 outline-none"
            onClick={() => sendMessageHandler()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
