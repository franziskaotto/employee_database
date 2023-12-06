/*
Loading the .env file and creates environment variables from it
*/

// Import required modules and data files
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const position = require("./position.json");
const EmployeeModel = require("../db/employee.model");
const PositionModel = require("../db/position.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //  // Exit the program if MONGO_URL is missing
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});
  const positionData = await PositionModel.find()

  const employees = names.map((name) => {
    const randomPosition = pick(positionData);
    return {
      name,
      level: pick(levels),
      position: randomPosition.name,
      salaray: randomPosition.salaray,

    }
  });

  // Insert the array of employee objects into the MongoDB database
  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populatePositions = async () => {
  await PositionModel.deleteMany({});

  await PositionModel.create(...position);
  console.log("Positions created");
};


// Main function to connect to MongoDB, populate employees, and disconnect
const main = async () => {
  // Connect to the MongoDB database using the specified URL
  await mongoose.connect(mongoUrl);

  // Populate the Employees collection in the database
  await populateEmployees();
  await populatePositions();

  // Disconnect from the MongoDB database
  await mongoose.disconnect();
};

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
