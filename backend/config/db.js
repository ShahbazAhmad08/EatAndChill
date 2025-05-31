import mongoose from "mongoose";
export const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully"));
};
