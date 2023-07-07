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
      <div className="relative h-[400px] w-[300px] bg-white z-[1] border-[2px] border-[#7AC74F]/75 flex flex-col items-center justify-center">
        <button
          className="absolute top-[5px] right-[5px] h-[25px] w-[50px] text-[14px]"
          onClick={() => hideAddComponent(<></>)}
        >
          Close
        </button>
        <p className="absolute top-[25px] text-[#7AC74F]/50 text-[20px] font-bold">
          Add Room
        </p>
        <input
          type="text"
          className="absolute top-[100px] h-[35px] w-[200px] border-b-[1px] border-b-black/50 outline-none text-center"
          placeholder="Room Name"
          name="room_name"
          onChange={onChangeHandler}
        />
        <div
          className="absolute top-[175px] h-[35px] w-[150px] bg-[#7AC74F]/50 flex items-center justify-center text-black/50 font-bold text-[14px] cursor-pointer "
          onClick={() =>
            setIsOpen((type) => {
              return !type;
            })
          }
        >
          {roomType}
        </div>
        <div
          className={`absolute top-[210px] ${
            isOpen === true ? "h-[70px]" : "h-[0px]"
          }  w-[150px] bg-white border-[1px] border-[#7AC74F]/50 z-[1]`}
          onClick={() =>
            setIsOpen((type) => {
              return !type;
            })
          }
        >
          <div
            className={`relative ${
              isOpen === false && "hidden"
            } h-[35px] w-[150px] border-b-[1px] border-b-[#7AC74F]/25 flex items-center justify-center text-[12px] text-black/75`}
            onClick={() => setRoomType("Public")}
          >
            Public
          </div>
          <div
            className={`relative ${
              isOpen === false && "hidden"
            } h-[35px] w-[150px] border-b-[1px] border-b-[#7AC74F]/25 flex items-center justify-center text-[12px] text-black/75`}
            onClick={() => setRoomType("Private")}
          >
            Private
          </div>
        </div>

        {roomType === "Private" && (
          <input
            type="password"
            className="absolute top-[250px] h-[35px] w-[200px] border-b-[1px] border-black/50 text-center outline-none"
            placeholder="Room Password"
            name="room_password"
            onChange={onChangeHandler}
          />
        )}

        <button
          className="absolute bottom-[50px] text-[#7AC74F]/75 text-[16px] font-bold"
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
