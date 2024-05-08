import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

interface Accounts {
  name: string;
  description: string;
}
export interface IUser extends Document {
  wallet: string;
  fullName: string,
  company: string,
  bio: string,
  avatar: string,
  ip: string,
  created: Date,
  facebook: string,
  twitter: string,
  instagram: string,
  linkedin: string,
  farcaster: string,
  lens: string
}
interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new Schema({
  wallet: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  farcaster: {
    type: String,
  },
  lens: {
    type: String,
  },
  bio: {
    type: String,
    require: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.encryptPassword = (password: string) =>
  hashSync(password, genSaltSync(10));
const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);

interface UserData {
  _id: ObjectId;
  wallet: string,
  fullName: string,
  company: string,
  avatar: string,
  bio: string,
  ip: string,
  created: Date
  website: string,
  twitter: string,
  linkedin: string,
  facebook: string,
  instagram: string,
  farcaster: string,
  lens: string, 
}

const findUserDataByUserName = async (
  userName: string
): Promise<UserData[]> => {
  return await User.find({
    username: userName,
  });
};

export { findUserDataByUserName };

export default User;
