const express = require("express");
const companyModel = require("../db/company.model");
const router = express.Router();


router.get("/", async (req, res) => {
  const companies = await companyModel.find();
  return res.json(companies);
});




router.post("/", async (req, res) => {
  const newCompany = req.body;

  try {
    const data = await companyModel.create(newCompany);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;