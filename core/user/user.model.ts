import { HydratedDocument, model, Model, models, Query } from "mongoose";
import { hashPassword, verifyPassword } from "lib/auth/password";
import userSchema from "core/user/user.schema";
import { IUser, UserMethods } from "core/user/user.types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserModel extends Model<IUser, {}, UserMethods> {
  findByEmail(
    email: string,
  ): Query<
    HydratedDocument<IUser, UserMethods> | null,
    HydratedDocument<IUser, UserMethods>
  >;
  findByUsername(
    username: string,
  ): Query<
    HydratedDocument<IUser, UserMethods> | null,
    HydratedDocument<IUser, UserMethods>
  >;
}

userSchema.static("findByUsername", function (username: string): Query<
  HydratedDocument<IUser, UserMethods> | null,
  HydratedDocument<IUser, UserMethods>
> {
  return this.findOne({
    username,
  });
});

userSchema.static("findByEmail", function (email: string): Query<
  HydratedDocument<IUser, UserMethods> | null,
  HydratedDocument<IUser, UserMethods>
> {
  return this.findOne({
    email,
  });
});

userSchema.methods.verifyPassword = function (
  this: HydratedDocument<IUser, UserMethods>,
  password: string,
): Promise<boolean> {
  return verifyPassword(password, this.password);
};

userSchema.methods.setPassword = async function (
  this: HydratedDocument<IUser, UserMethods>,
  password: string,
): Promise<void> {
  const hash: string = await hashPassword(password);
  this.password = hash;
};

const User =
  (models.User as UserModel) || model<IUser, UserModel>("User", userSchema);
export default User;
