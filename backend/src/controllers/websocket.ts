import { Server, Socket } from "socket.io";

const rooms: Map<string, string[]> = new Map();

const websocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join-room", (room_id: string) => {
      if (rooms.get(room_id) === undefined) {
        rooms.set(room_id, [socket.id]);
      } else {
        rooms.get(room_id)!.push(socket.id);
      }
    });

    socket.on("send-message", (message, room_id, sender_id, sendername) => {
      rooms.get(room_id)?.forEach((user_socket) => {
        io.to(user_socket).emit(
          "response-message",
          message,
          sender_id,
          room_id,
          sendername
        );
      });
    });

    socket.on("leave-room", (room: string) => {
      if (!rooms.has(room)) return socket.emit("leaved-room", false);
      rooms.delete(room);
      socket.emit("leaved-room", true);
    });

    socket.on("disconnect", () => {});
  });
};

export default websocket;
