import { useState } from "react";
import Image from "next/image";
import loading_gif from "../app/assets/loading.gif";
import { roomAPI } from "../app/api";

interface PropTypes {
  hideAddComponent: (data: JSX.Element) => void;
}

interface RoomTypes {
  room_name: string;
  room_password: string;
}

const AddRoom = ({ hideAddComponent }: PropTypes) => {
  const [component, setComponent] = useState(<></>);
  const [room, setRoom] = useState<RoomTypes>({
    room_name: "",
    room_password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [roomType, setRoomType] = useState("Set Room Type");

  const loadingComponent = () => {
    return (
      <div className="fixed z-[2] top-0 left-0 h-screen w-screen bg-white/50 flex flex-col items-center justify-center z-[2]">
        <p className="text-[28px] font-bold text-black/50">Creating Room</p>
        <div className="relative h-[125px] w-[125px] bg-black/50 mt-[15px] flex items-center justify-center">
          <Image src={loading_gif} alt="" height={100} width={100} />
        </div>
      </div>
    );
  };

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    setRoom((prevState) => ({ ...prevState, [name]: value }));
  };

  const createRoomHandler = async () => {
    try {
      if (room.room_name === "") {
        hideAddComponent(<></>);

        return window.alert("Room name is required!");
      }

      if (roomType !== "Private") {
        setRoomType("Public");
        room.room_password = "";
      } else {
        if (room.room_password.length <= 0) {
          return window.alert("Password is required in private rooms");
        }
      }
      setComponent(() => loadingComponent());
      await roomAPI.addRooms(room.room_name, roomType, room.room_password);
    } catch (error) {
      console.log(error);
    }
    hideAddComponent(<></>);
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-white/50">
      <div className="relative h-[350px] w-[250px] bg-white z-[1] border-[2px] border-[#7AC74F]/75 flex flex-col items-center justify-start">
        <button
          className="absolute top-[5px] boxShadow2 right-[5px] h-[25px] w-[50px] text-[10px] text-white/75 bg-[#1e1e1e]/75 rounded-[50px]"
          onClick={() => hideAddComponent(<></>)}
        >
          Close
        </button>
        <p className="absolute top-[25px] text-[#7AC74F] text-[16px]">
          Add Room
        </p>

        <div className="relative mt-[30%] h-[35px] w-[75%] boxShadow2 rounded-[50px] flex items-center justify-center">
          <input
            type="text"
            className="h-[85%] w-[80%] border-b-[2px] border-b-black/25 outline-none text-center text-[12px]"
            placeholder="Room Name"
            name="room_name"
            onChange={onChangeHandler}
          />
        </div>
        {roomType === "Private" && (
          <div className="relative mt-[10px] h-[35px] w-[75%] boxShadow2 rounded-[50px] flex items-center justify-center">
            <input
              type="password"
              className="h-[85%] w-[80%] border-b-[2px] border-b-black/25 outline-none text-center text-[12px]"
              placeholder="Room Password"
              name="room_password"
              onChange={onChangeHandler}
            />
          </div>
        )}

        <div
          className="absolute top-[175px] h-[30px] w-[125px] bg-[#1e1e1e]/75 flex items-center justify-center text-white/75 text-[12px] cursor-pointer "
          onClick={() =>
            setIsOpen((type) => {
              return !type;
            })
          }
        >
          {roomType}
        </div>
        <div
          className={`absolute top-[205px] ${
            isOpen === true ? "h-[60px]" : "h-[0px]"
          }  w-[125px] bg-white border-[1px] border-[#1e1e1e]/25 z-[1]`}
          onClick={() =>
            setIsOpen((type) => {
              return !type;
            })
          }
        >
          <div
            className={`relative ${
              isOpen === false && "hidden"
            } h-[30px] w-[125px] border-b-[1px] border-b-[#1e1e1e]/25 flex items-center justify-center text-[12px] text-black/75`}
            onClick={() => setRoomType("Public")}
          >
            Public
          </div>
          <div
            className={`relative ${
              isOpen === false && "hidden"
            } h-[30px] w-[125px] border-b-[1px] border-b-[#1e1e1e]/25 flex items-center justify-center text-[12px] text-black/75`}
            onClick={() => setRoomType("Private")}
          >
            Private
          </div>
        </div>

        <button
          className="absolute bottom-[50px] h-[30px] w-[75%] bg-[#7AC74F] text-white/75 text-[12px] font-bold rounded-[50px]"
          onClick={() => createRoomHandler()}
        >
          Create
        </button>
        {component}
      </div>
    </div>
  );
};

export default AddRoom;
