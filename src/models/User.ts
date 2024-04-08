import mongoose, { Schema, Model, model, ObjectId } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

interface Accounts {
  name: string;
  description: string;
}
export interface IUser extends Document {
  // username: string;
  wallet: string;
  fullName: string,
  company: string,
  socialLink: string,
  bio: string,
  avatar: string,
  ip: string;
  created: Date
  // facebook: string,
  // twitter: string,
  // instagram: string,
  // linkedin: string,
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
  socialLink: {
    type: String
  },
  bio: {
    type: String,
    require: true
  },
  created: {
    type: Date,
    default: Date.now
  }
  // username: {
  //   type: String,
  //   required: true,
  // },
  // facebook: {
    //   type: String,
    //   required: true,
  // },
  // twitter: {
  //   type: String,
  //   required: true,
  // },
  // instagram: {
  //   type: String,
  //   required: true,
  // },
  // linkedin: {
  //   type: String,
  //   required: true,
  // },
  
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
  socialLink: string, 
  bio: string,
  ip: string,
  created: Date
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
