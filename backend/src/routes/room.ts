import express from "express";
import { roomController } from "../controllers";
const router = express.Router();

router.get("/get-rooms", roomController.getRooms);
router.post("/add-rooms", roomController.addRoom);
router.post("/join-room", roomController.joinRoom);
router.post("/check-room-info", roomController.getRoomInfo);

export default router;
