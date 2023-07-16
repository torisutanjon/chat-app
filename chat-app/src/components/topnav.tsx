import Image from "next/image";
import plus_icon from "@/app/assets/plus.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { AddRoom } from "../components";
import loading_gif from "../app/assets/loading.gif";
import cross_icon from "../app/assets/cross.png";
import { roomAPI } from "@/app/api";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

interface PropTypes {
  isLogined?: boolean;
  roomInfo?: {
    id?: string;
    name?: string;
  };
  showAddComponent: (data: JSX.Element) => void;
  hideAddComponent: (data: JSX.Element) => void;
  leaveRoomHandler?: () => void;
}

interface UserTypes {
  userid: string;
  email: string;
  username: string;
}

interface RoomTypes {
  room_name: string;
  room_type: string;
  room_password: string;
}

interface RoomInfoTypes {
  id: string;
  name: string;
}

const TopNav = ({
  isLogined,
  roomInfo,
  showAddComponent,
  hideAddComponent,
  leaveRoomHandler,
}: PropTypes) => {
  const router = useRouter();
  const [user, setUser] = useState<UserTypes>();
  const [room, setRoom] = useState<Array<RoomTypes>>();
  const [login, setLogin] = useState<boolean>();
  const [component, setComponent] = useState(<></>);
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  const loadingComponent = () => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[32px] font-bold text-black/50">Joining Room</p>
        <div className="relative h-[125px] w-[125px] bg-black/50 mt-[15px] flex items-center justify-center">
          <Image src={loading_gif} alt="" height={100} width={100} />
        </div>
      </div>
    );
  };

  const passwordComponent = (room_name: string) => {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/25 z-[3]">
        <div className="relative h-[25%] w-[85%] flex flex-col items-center justify-evenly bg-white">
          <button
            className="absolute top-[1%] right-[1%] h-[25px] w-[25px] border-[2px] border-black/25 rounded-[4px] flex items-center justify-center"
            onClick={() => setComponent(<></>)}
          >
            <Image src={cross_icon} alt="" height={20} width={20} />
          </button>
          <p className="text-[18px] text-black/50">Enter Password</p>
          <input
            type="password"
            placeholder="Enter password"
            id="password_input"
            className="h-[35px] w-[75%] outline-none text-center border-b-[1px] border-b-black/50 text-[14px]"
          />
          <button
            className=" text-[16px] text-[#7AC74F]/75 font-bold"
            onClick={() => {
              const password = document.getElementById(
                "password_input"
              ) as HTMLInputElement;
              joinPrivateRoomHandler(room_name, password.value);
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  };

  const hideComponent = (data: JSX.Element) => {
    hideAddComponent(data);
  };

  //get the rooms from database
  const getRoomsHandler = async () => {
    try {
      const res: RoomTypes[] = await roomAPI.getRooms();
      setRoom(res);
    } catch (error) {
      console.log(error);
    }
  };

  const credentialHandler = async (room_name: string, room_type: string) => {
    if (login === false) return window.alert("Login first");
    setComponent(() => loadingComponent());
    try {
      if (room_type === "Public") {
        await joinPublicRoomHandler(room_name);
        setComponent(<></>);
      } else {
        setComponent(() => passwordComponent(room_name));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinPublicRoomHandler = async (room_name: string) => {
    const { status, room }: { status: Boolean; room: RoomInfoTypes } =
      await roomAPI.joinRoom(user!.userid, room_name);

    if (status === false) return;
    router.push(`/${room.id}`);
  };

  const joinPrivateRoomHandler = async (
    room_name: string,
    room_password: string
  ) => {
    setComponent(() => loadingComponent());
    try {
      const { status, room }: { status: Boolean; room: RoomInfoTypes } =
        await roomAPI.joinRoom(user!.userid, room_name, room_password);

      if (status === false) return;

      router.push(`/${room.id}`);
    } catch (error) {}
    setComponent(<></>);
  };

  useEffect(() => {
    getRoomsHandler();
    const token = localStorage.getItem("userToken");
    if (!token) {
      setLogin(false);
      return;
    }

    const decodedToken: any = jwt(token);
    setUser({
      userid: decodedToken.user_id,
      email: decodedToken.user_email,
      username: decodedToken.username,
    });
    setLogin(true);
  }, []);

  return (
    <div className="relative h-[20%] w-full flex flex-col items-center justify-center md:h-[15%] md:bg-[#303030]">
      <div className="relative h-1/2 w-full flex flex-row items-center justify-center">
        {isLogined === undefined ? (
          <></>
        ) : isLogined === false ? (
          <></>
        ) : (
          <>
            {isMobile ? (
              <button
                className="absolute h-[26px] w-[26px] left-[5%] flex items-center justify-center outline-none"
                onClick={() =>
                  showAddComponent(<AddRoom hideAddComponent={hideComponent} />)
                }
              >
                <Image
                  src={plus_icon}
                  alt=""
                  className="relative h-full w-full outline-none"
                />
              </button>
            ) : (
              <p
                className="absolute left-[5%] text-white/75 cursor-pointer text-[14px]"
                onClick={() =>
                  showAddComponent(<AddRoom hideAddComponent={hideComponent} />)
                }
              >
                Create Room
              </p>
            )}
          </>
        )}
        {roomInfo === undefined ? (
          <></>
        ) : (
          <div className="relative h-[85%] w-[60%] flex flex-col items-center justify-evenly md:w-[20%]">
            <div className="relative h-[50%] w-[75%] border-[1px] border-black/25 flex flex-col items-center justify-evenly">
              <p className="text-[10px] text-black font-bold md:w-[25%] md:text-white/75 md:text-[14px] md:font-normal">
                Room Info
              </p>
              <div className="relative h-[50%] w-full gridLayout">
                <div className="relative h-full w-full flex items-center justify-end">
                  <p className="text-[10px] text-black mr-[5px] md:text-[12px] md:text-white/75">
                    Room Name:
                  </p>
                </div>
                <div className="relative h-full w-full flex items-center justify-start">
                  <p className="text-[10px] text-black md:text-[12px] md:text-white/75">
                    {roomInfo.name}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="h-[20px] w-[85px] rounded-[4px] border-[1px] border-[#1e1e1e]/25 text-[#1e1e1e]/75 text-[10px] md:mt-[5px] md:border-white/75 md:text-white/75"
              onClick={() => leaveRoomHandler!()}
            >
              Leave Room
            </button>
          </div>
        )}
        {isLogined === undefined ? (
          <></>
        ) : isLogined === false ? (
          <Link
            href="/login"
            className="absolute h-[30px] w-[75px] rounded-[50px] boxShadow2 bg-[#1e1e1e]/75 right-[5%] text-white/50 text-[12px] flex items-center justify-center"
          >
            Login
          </Link>
        ) : (
          <>
            {isMobile ? (
              <Link href="/profile" className="absolute right-[5%]">
                <button className="relative h-[40px] w-[40px] rounded-[50px] boxShadow2 text-[24px] text-white/75 bg-[#1e1e1e]/75">
                  {user?.username.charAt(0).toUpperCase()}
                </button>
              </Link>
            ) : (
              <Link
                href="/profile"
                className="absolute right-[5%] cursor-pointer text-[14px] text-white/75"
              >
                <button className="relative h-[30px] w-[80px] border-[1px] border-white/50 text-white/75 rounded-[50px] text-[12px]">
                  {user?.username}
                </button>
              </Link>
            )}
          </>
        )}
      </div>
      <div className="relative h-1/2 w-full bg-white flex flex-row items-center justify-between">
        {room === undefined || room.length === 0 ? (
          <div className="relative h-full w-full flex items-center justify-center">
            <p className="text-[#7AC74F]/75">no rooms found</p>
          </div>
        ) : (
          <>
            <div className="relative h-[85%] w-full overflow-y-hidden overflow-x-auto whitespace-nowrap">
              {room.map((data: RoomTypes, key) => {
                return (
                  // container # one
                  <div
                    className="relative h-full w-[125px] inline-block bg-none overflow-hidden md:w-[150px]"
                    key={key}
                    onClick={() =>
                      credentialHandler(data.room_name, data.room_type)
                    }
                  >
                    {/* container # two */}
                    <div className="relative h-full w-full flex items-center justify-center">
                      {/* clickable div */}
                      <div className="relative h-[65%] w-[85%] bg-[#7AC74F] rounded-[50px] flex items-center justify-center cursor-pointer md:h-[60%] md:w-[70%]">
                        <p className="text-white/75 text-[10px] md:text-[11px]">
                          {data.room_name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      {component}
    </div>
  );
};

export default TopNav;
