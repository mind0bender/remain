import { MONGO_URI } from "config/env";
import mongoose, { connect, Mongoose } from "mongoose";

interface MongoCache {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalForMongoose = global as unknown as {
  mongoose: MongoCache;
};

const cached: MongoCache = {
  connection: null,
  promise: null,
};

export default async function connectDB(): Promise<Mongoose> {
  if (cached.connection) return cached.connection;
  if (!cached.promise) {
    cached.promise = connect(MONGO_URI, {
      bufferCommands: false,
    });
  }
  try {
    cached.connection = await cached.promise;
    globalForMongoose.mongoose = cached;
    console.log("connected to DB");
    return cached.connection;
  } catch (e: unknown) {
    console.error("cannot connet to db");
    console.error(e);
    throw e;
  }
}
