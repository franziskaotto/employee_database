

require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const LevelModel = require("../db/level.model")
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); 
}


const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];


const populateLevel = async () => {
  await LevelModel.deleteMany({});
  const allLevels = levels.map((level) => ({
    name: level.name,
    value: level.value
  }))
  const createdLevels = await LevelModel.create(...allLevels);
  console.log("level created");
}
const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const levelData = await LevelModel.find()

  const employees = names.map((name) => {
  const randomLevel = pick(levelData)
    return {
      name,
      level: {value: randomLevel.value, name: randomLevel.name },
      position: pick(positions),
    }
  });
  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  await populateLevel()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
