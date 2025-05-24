/**
 * @module mongooseConnection
 * @description MongoDB connection handler for the catalog service.
 * Manages the connection to MongoDB using Mongoose ODM.
 */
const mongoose = require("mongoose");

/**
 * Establishes connection to MongoDB database
 * @async
 * @function connectToMongoose
 * @param {string} connectionString - MongoDB connection URI (e.g., mongodb://localhost:27017/catalog)
 * @returns {Promise<void>} Resolves when connection is established
 * @throws {Error} If connection fails, process will exit with code 1
 */
const connectToMongoose = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
    process.exit(1);
  }
};

module.exports = connectToMongoose;
