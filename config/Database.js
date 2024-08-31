import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
} 