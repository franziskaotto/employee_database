const express = require("express");
const router = express.Router();
const CompanyModel = require("../db/company.model");

router.get("/", async (req, res) => {
  try {
    const company = await CompanyModel.find()
    return res.json(company);
  } catch (error) {
    res.status(500).json({error: "internal server error"})
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const company = await CompanyModel.findById(id);
    return res.json(company);
    
  } catch (error) {
    res.status(500).json({ error: "could not find by Id"})
  }
});



router.post("/", async (req, res) => {
  const newCompany = req.body;
  console.log(newCompany);
  try {
    const data = await CompanyModel.create(newCompany); //from req.body
    return res.json(data);
  } catch (error) {
    console.log("error posting Company", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
//PATCH
//DELETE

module.exports = router;



