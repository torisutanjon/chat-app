import mongoose from "mongoose";

const ROOM_SCHEMA = new mongoose.Schema(
  {
    room_name: {
      type: String,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
    },
    room_password: {
      type: String,
      required: false,
    },
  },
  {
    collection: "rooms",
  }
);

export const ROOM_MODEL = mongoose.model("rooms", ROOM_SCHEMA);
