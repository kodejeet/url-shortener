const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "url-shortner";

if (!uri) {
  throw new Error("MONGODB_URI environment variable is required");
}

let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Mongoose connected");
    return mongoose.connection;
  } catch (err) {
    console.error("Mongoose connection error:", err);
    throw err;
  }
}

module.exports = { connectToMongoDB };
