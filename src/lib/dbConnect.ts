import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongoURI as string);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
