/*
Loading the .env file and creates environment variables from it
*/

// Import required modules and data files
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");

const mongoUrl = process.env.MONGO_URL;

// Check if the MONGO_URL environment variable is provided
if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //  // Exit the program if MONGO_URL is missing
}

/*the (from) => is a parameter of the "pick" function:
function pick(from) {
  return from[Math.floor(Math.random() * from.length)];
}

die argumente werden in der populateEmployees übergeben
*/
const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  //weil wir ja vielleicht schon einmal in der DB waren, muss er erst alles einmal löschen
  // Delete all existing documents in the EmployeeModel collection
  await EmployeeModel.deleteMany({});

  // Creates an array of employee objects with random names, levels, and position
  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
  }));

  // Insert the array of employee objects into the MongoDB database
  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

// Main function to connect to MongoDB, populate employees, and disconnect
const main = async () => {
  // Connect to the MongoDB database using the specified URL
  await mongoose.connect(mongoUrl);

  // Populate the Employees collection in the database
  await populateEmployees();

  // Disconnect from the MongoDB database
  await mongoose.disconnect();
};

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
