const mongoose = require("mongoose");

const { Schema } = mongoose;
//Level
const LevelSchema = new Schema({
  value: Number,
  name: String,
});

module.exports = mongoose.model("Level", LevelSchema);
