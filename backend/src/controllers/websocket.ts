import { Server, Socket } from "socket.io";
import { ROOM_MODEL } from "../models/room";

type Room = {
  user_id: string;
  user_socket: any;
};

type RoomMap = Map<string, Room[]>;

const rooms: RoomMap = new Map();

const websocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join-room", async (room_id: string, user_id: string) => {
      try {
        const room = await ROOM_MODEL.findOne({
          _id: room_id,
        });

        if (room) {
          socket.join(room._id.toString());
          if (rooms.get(room_id) === undefined) {
            rooms.set(room_id, [{ user_id: user_id, user_socket: socket.id }]);
          } else {
            const user = rooms
              .get(room_id)
              ?.find((participant) => participant.user_id === user_id);
            if (!user) {
              rooms
                .get(room_id)
                ?.push({ user_id: user_id, user_socket: socket.id });
            } else {
              user.user_socket = socket.id;
            }
          }
        }
        console.log(rooms);
      } catch (error) {
        console.log(`Error in join-room: ${error}`);
      }
    });

    socket.on("send-message", (message, room_id, user_id, username) => {
      try {
        io.to(room_id).emit(
          "response-message",
          message,
          user_id,
          room_id,
          username
        );
        console.log(rooms);
      } catch (error) {
        console.log(`Error in send-message: ${error}`);
      }
    });

    socket.on("leave-room", (room_id, user_id) => {
      try {
        console.log(room_id, user_id);
        const room = rooms.get(room_id);

        if (room) {
          const participant_index = room.findIndex(
            (participant) => participant.user_id === user_id
          );

          if (participant_index !== -1) {
            room.splice(participant_index, 1);
          }
        }
        socket.emit("leaved-room", true);
        socket.disconnect();
      } catch (error) {
        console.log(`Error in leave-room: ${error}`);
      }
      console.log(rooms);
    });
  });
};

export default websocket;
