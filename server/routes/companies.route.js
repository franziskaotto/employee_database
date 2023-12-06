const express = require("express");
const router = express.Router();
const CompanyModel = require("../db/company.model");

router.get("/", async (req, res) => {
  const company = await CompanyModel.find()
  return res.json(company);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const company = await CompanyModel.findById(id);
  return res.json(company);
});

router.post("/", async (req, res) => {
  const company = req.body;
  try {
    const saved = await CompanyModel.create(company); //from req.body
    return res.json(saved)
  } catch (error) {
    console.log("error posting Company", error)
  }
})
//PATCH
//DELETE

module.exports = router;



