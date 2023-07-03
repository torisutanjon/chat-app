import axios from "axios";

const roomAPI = {
  getRooms: async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/room/get-rooms",
      });

      return res?.data?.rooms;
    } catch (error: any) {
      console.log(error);
      window.alert("Internal Server Error, Reloading the page");
      window.location.href = "/";
    }
  },
  addRooms: async (
    room_name: string,
    room_type: string,
    room_password: string
  ) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://localhost:5000/room/add-rooms",
        data: {
          room_name,
          room_type,
          room_password,
        },
      });

      window.alert(res?.data?.message);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
    }
  },
  joinRoom: async (id: string, room_name: string, password?: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://localhost:5000/room/join-room",
        data: {
          id,
          room_name,
          password,
        },
      });
      return res?.data;
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message === undefined) {
        window.alert("Internal Server Error");
      } else {
        window.alert(error?.response?.data?.message);
      }
      return error?.response?.data?.status;
    }
  },
  getRoomInfo: async (room_id: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://localhost:5000/room/check-room-info",
        data: {
          room_id,
        },
      });

      return res?.data?.room_info;
    } catch (error: any) {
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
      window.location.href = "/";
    }
  },
};

export default roomAPI;
