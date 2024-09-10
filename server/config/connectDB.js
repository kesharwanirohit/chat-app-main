/* This JavaScript code snippet is setting up a connection to a MongoDB database using Mongoose, which
is an Object Data Modeling (ODM) library for MongoDB and Node.js. Here's a breakdown of what the
code is doing: */
const mongoose = require("mongoose");
require("dotenv").config();

// Load MongoDB URI from environment variable
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://fearlesskingrising:Rohit%402001@cluster0.fidagln.mongodb.net/Cluster0?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    // Set the strictQuery option to suppress the warning
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
