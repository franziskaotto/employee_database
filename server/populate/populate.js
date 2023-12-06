

require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const companies = require("./company.json")
const CompanyModel = require("../db/company.model")

const EmployeeModel = require("../db/employee.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //  // Exit the program if MONGO_URL is missing
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateCompany = async () => {
  await CompanyModel.deleteMany({});

  const companiesData = companies.map((company) => ({
    name: company,
  }))
  createdCompany = await CompanyModel.create(...companiesData);
  console.log("companies created");
  
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    company: pick(createdCompany)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);
  
  await populateCompany();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
