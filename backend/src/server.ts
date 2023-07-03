import { conn } from "./config/db_config";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { userRoute, roomRouter } from "./routes";
import { Server } from "socket.io";
import { websocket } from "./controllers";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

websocket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/user", userRoute);
app.use("/room", roomRouter);

server.listen(PORT, () => {
  try {
    console.log(`Connected to PORT: ${PORT}`);
    conn();
  } catch (error) {
    console.log(`Unable to connect to port:${PORT} with an ${error}`);
  }
});
