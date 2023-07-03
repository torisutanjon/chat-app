import { ROOM_MODEL } from "../models/room";
import bcrypt from "bcrypt";

interface RoomTypes {
  room_name: String;
  room_type: String;
  room_password: String;
}

export default {
  getRooms: async (req: any, res: any) => {
    try {
      const roomArray: RoomTypes[] = [];
      const rooms = await ROOM_MODEL.find({});

      rooms.map((room: RoomTypes) => {
        roomArray.push({
          room_name: room.room_name,
          room_type: room.room_type,
          room_password: room.room_password,
        });
      });

      res.status(200).send({ rooms: roomArray });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  addRoom: async (req: any, res: any) => {
    try {
      if (req.body.room_type !== "Private") {
        req.body.room_type = "Public";
      }

      if (req.body.room_password === "") {
        req.body.room_password = undefined;
      }

      const room = await ROOM_MODEL.findOne({
        room_name: req.body.room_name,
      });

      if (room)
        return res.status(409).send({ message: "Room name already exists" });

      let password = undefined;

      if (req.body.room_password !== undefined) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_HASH!));
        const hash = await bcrypt.hash(req.body.room_password, salt);
        password = hash;
      }

      await ROOM_MODEL.create({
        room_name: req.body.room_name,
        room_type: req.body.room_type,
        room_password: password,
      });
      return res.status(201).send({ message: "Room Created" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  joinRoom: async (req: any, res: any) => {
    let isMatch = true;
    try {
      const room = await ROOM_MODEL.findOne({
        room_name: req.body.room_name,
      });

      if (!room) return res.status(404).send({ status: false });

      if (req.body.password !== undefined) {
        isMatch = await bcrypt.compare(req.body.password, room.room_password);
      }

      if (isMatch === false)
        return res
          .status(500)
          .send({ status: false, message: "Room Password Incorrect" });

      const roomInfo = {
        id: room._id,
        name: room.room_name,
      };

      return res.status(200).send({ status: true, room: roomInfo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Internal Server Error", status: false });
    }
  },
  getRoomInfo: async (req: any, res: any) => {
    try {
      const room = await ROOM_MODEL.findOne({
        _id: req.body.room_id,
      });

      if (!room)
        return res
          .status(404)
          .send({ message: "Some error occured on retrieving room info." });

      const room_info = {
        id: room._id,
        room_name: room.room_name,
      };

      return res.status(200).send({ room_info: room_info });
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
