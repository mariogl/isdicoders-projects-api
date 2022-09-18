import { model, Schema } from "mongoose";
import { IUser } from "../../types/interfaces";
import userDataConstants from "../../utils/userDataConstants";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    minlength: userDataConstants.username.min,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

const User = model("User", UserSchema, "users");

export default User;
