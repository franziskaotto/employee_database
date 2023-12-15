const mongoose = require("mongoose");

const { Schema } = mongoose;
//Position
const PositionSchema = new Schema({
  name: String,
  salary: Number,
 
});

module.exports = mongoose.model("Position", PositionSchema);
