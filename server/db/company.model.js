// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;
//Company
const CompanySchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Company", CompanySchema);
