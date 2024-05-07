import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Databse connected successfully!");
  } catch (error) {
    console.log("Error in databse connection: ", error);
  }
};
export default connnectDB;
