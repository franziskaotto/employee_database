const mongoose = require("mongoose");
const position = require(".position.json")
const PositionModel = require("../../db/position.model")

const mongoUrl = process.env.MONGO_URL;


// Check if the MONGO_URL environment variable is provided
if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //  // Exit the program if MONGO_URL is missing
}


const populatePositions = async () => {
  await PositionModel.deleteMany({});

  const positions = position.map((element) => ({
    name: position.name,
    salary: position.salary,
  }));

  await PositionModel.create(...positions);
  console.log("positions created")

  

}

const main = async () => {

  await mongoose.connect(mongoUrl);
  await populatePositions()
  await mongoose.disconnect()
}

main()
.catch((error) => {
  console.log(error)
  process.exit(1)
})