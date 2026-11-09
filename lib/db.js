import mongoose from "mongoose";
import dns from "dns";

// Fix Windows DNS SRV lookup issues for MongoDB Atlas (+srv)
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (_) {}

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://sa798027:sa798027@cluster0.bgatlhp.mongodb.net/food-del?retryWrites=true&w=majority";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    }).catch((err) => {
      console.warn("MongoDB connection failed, operating with graceful fallback:", err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("DB connection error:", e.message);
  }

  return cached.conn;
}

export default connectDB;

