const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotesSchema = new Schema({
  note: String,
});

module.exports = mongoose.model("Notes", NotesSchema);

