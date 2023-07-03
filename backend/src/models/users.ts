import mongoose from "mongoose";

const USER_ACCOUNT_SCHEMA = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
      required: false,
    },
    verificationStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    room: {
      type: String,
      required: false,
    },
  },
  {
    collection: "useraccounts",
  }
);

export const USER_ACCOUNT_MODEL = mongoose.model(
  "useraccounts",
  USER_ACCOUNT_SCHEMA
);
