"use client";

import { useState, useEffect } from "react";
import { roomAPI } from "../api";
import { io } from "socket.io-client";
import jwt from "jwt-decode";
import { MessageComponent, TopNav } from "@/components";

interface MessageTypes {
  sender_id: string;
  sendername: string;
  message: string;
}

interface ParamTypes {
  params: {
    room: [room_id: string];
  };
}
interface RoomInfoTypes {
  id: string;
  name: string;
}

const ChatComponent = ({ params }: ParamTypes) => {
  const [room_id] = params.room;

  const socket = io("http://localhost:5000");
  const [chats, setChats] = useState<MessageTypes[]>([]);
  const [component, setComponent] = useState(<></>);
  const [roomInfo, setRoomInfo] = useState<RoomInfoTypes>();

  socket.on("response-message", (message, sender_id, roomid, sendername) => {
    if (room_id === roomid) {
      setChats((chats) => [...chats, { sender_id, sendername, message }]);
    }
  });

  socket.on("leaved-room", (status: Boolean) => {
    if (status === false)
      return window.alert(
        "Error on leaving room please close the app and open again."
      );
    window.location.href = "/";
  });

  const showAddComponent = (data: JSX.Element) => {
    setComponent(data);
  };

  const hideAddComponent = (data: JSX.Element) => {
    setComponent(data);
  };

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

  const leaveRoomHandler = () => {
    socket.emit("leave-room", room_id);
  };

  const getRoomInfoHandler = async () => {
    try {
      const res = await roomAPI.getRoomInfo(room_id);
      setRoomInfo({
        id: res.id,
        name: res.room_name,
      });
    } catch (error) {
      console.log(error);
    }
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
    getRoomInfoHandler();
  }, [room_id]);

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-white flex flex-col items-center justify-between">
      <TopNav
        roomInfo={{ id: roomInfo?.id, name: roomInfo?.name }}
        isLogined={true}
        hideAddComponent={hideAddComponent}
        showAddComponent={showAddComponent}
        leaveRoomHandler={leaveRoomHandler}
      />
      <div className="relative h-[75%] w-full flex flex-col items-center justify-center">
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
      {component}
    </div>
  );
};

export default ChatComponent;
