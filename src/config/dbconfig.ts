import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log(`Connected to the Database!`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
