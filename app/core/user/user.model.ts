import { HydratedDocument, model, Model, models } from "mongoose";
import { IUser, UserMethods } from "./user.types";
import userSchema from "./user.schema";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Model<IUser, {}, UserMethods> {
  findByEmail(email: string): Promise<HydratedDocument<IUser> | null>;
  findByUsername(username: string): Promise<HydratedDocument<IUser> | null>;
}

userSchema.static("findByUsername", function (username: string) {
  return this.findOne({
    username,
  });
});

userSchema.static("findByEmail", function (email: string) {
  return this.findOne({
    email,
  });
});

const User =
  (models.User as UserModel) || model<IUser, UserModel>("User", userSchema);
export default User;
