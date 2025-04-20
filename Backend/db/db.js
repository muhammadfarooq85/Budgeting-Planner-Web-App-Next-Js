// Libraries Imports
import mongoose from "mongoose";
// Local Imports
import { MONGODB_URI } from "../secrets/secrets.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}`);
    console.log("📁 MONGODB connected successfully!");
  } catch (error) {
    console.log("🥲 MONGODB connection failed!", error);
    process.exit(1);
  }
};

export default connectDB;
