const express = require("express");
const companyModel = require("../db/company.model");
const router = express.Router();


//company
router.get("/", async (req, res) => {
  const company = await companyModel.find();
  return res.json(company);
});

router.post("/", async (req, res) => {
  const company = req.body;
  try {
    const save = await companyModel.create(company);
    return res.json(company)
  } catch (error) {
   console.log(error) 
  }


})

module.exports = router;