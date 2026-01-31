import { Schema } from "mongoose";
import { IUser, UserMethods, UserModel, UserStatus } from "./user.types";

const userSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      hash: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        required: true,
        select: false,
      },
    },
    lifecycle: {
      status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.ACTIVE,
      },
      lastActiveAt: {
        type: Date,
        default: Date.now,
      },
      declaredDeadAt: {
        type: Date,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default userSchema;
