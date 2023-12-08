const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model")


router.get("/", async (req, res) => {
  try {
    const query = {}; 

    if (req.query.level) {
      console.log("req.query.level", req.query.level);
      query["level.name"] = { $regex: `^${req.query.level}`, $options: "i" };
    }
    console.log(query)

    let sortOption = {};

    if (req.query.sortOrder) {
      console.log("req.query.sortOrder", req.query.sortOrder);
      sortOption.level = req.query.sortOrder === "desc" ? -1 : 1


    }
    
    const employees = await EmployeeModel.find(query).sort(sortOption);
    //console.log(employees)
  
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;


//sortOption = { "level.name": "asc" };
//sortOption = { "level.value": "asc" };