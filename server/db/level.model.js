const mongoose = require("mongoose");

const { Schema } = mongoose;

const LevelSchema = new Schema({
  value: Number,
  name: String,
});

module.exports = mongoose.model("Level", LevelSchema);
