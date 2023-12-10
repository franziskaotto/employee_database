
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const EmployeeModel = require("../db/employee.model");
const positions = require("./positions.json");
const PositionModel = require("../db/positions.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); 
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populatePositions = async () => {
  await PositionModel.deleteMany({})
  await PositionModel.create(...positions)
  console.log("positions created")

}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const positionData = await PositionModel.find()

  const employees = names.map((name) => {
    const randomPosition = pick(positionData)
    return {
      name,
      level: pick(levels),
      position: randomPosition.name,
      salary: randomPosition.salary,
    }
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populatePositions()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
