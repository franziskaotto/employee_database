const express = require("express");
const employeeModel = require("../db/employee.model");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const query = {};

    if(req.query.level) {
      console.log(req.query.level)
      query["level.name"] = { $regex: `^${req.query.level}`, $options: "i" };
    }


    let sortOption = {};

    if (req.query.sortOrder) {
      sortOption.level = req.query.sortOrder === "desc" ? -1 : 1
    }
    const employees = await employeeModel.find(query).sort(sortOption);
    res.json(employees)


  } catch (error) {
    console.log(error)
    
  }



})


module.exports = router;