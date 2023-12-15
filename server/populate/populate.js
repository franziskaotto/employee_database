

require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const PositionModel = require("../db/position.model")
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); 
}


const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populatePositions = async () => {
  await PositionModel.deleteMany({});
  await PositionModel.create(...positions);
  console.log("PositionModel created");
}


const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const positionsData = await PositionModel.find()
console.log(positionsData)
  const employees = names.map((name) => {

    const randomPosition = pick(positionsData)

    return {
      name,
      level: pick(levels),
      position: randomPosition.name,
      salary: randomPosition.salary

    }
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populatePositions();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
