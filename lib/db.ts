import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;

if (!MONGO_URI) {
  throw new Error(
    "🔴 MONGO_DB_CONNECTION_STRING is missing in environment variables."
  );
}

// Use global caching to prevent multiple connections in serverless environments (like Vercel)
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) {
    console.log("🚀 Already connected to MongoDB.");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      serverSelectionTimeoutMS: 30000, // Wait max 30s for MongoDB to respond
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Successfully connected to MongoDB.");
  } catch (error) {
    console.error("🔴 MongoDB connection error:", error);
    cached.promise = null; // Reset promise so the next attempt can retry
  }

  return cached.conn;
};

// Set the global variable for reuse
(global as any).mongoose = cached;
