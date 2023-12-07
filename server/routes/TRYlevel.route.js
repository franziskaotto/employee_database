const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model")

// router.get("/", async (req, res) => {
//   const employees = await EmployeeModel.find().sort({ created: "desc" });
//   console.log("get Try");
//   return res.json(employees);
// });

router.get("/:sorted", async (req, res) => {
  try {
    const sortedBy = req.params.sorted;
    const sortedEmployees = await EmployeeModel.find().sort({
      [sortedBy]: "asc",
    });
    return res.json(sortedEmployees);
  } catch (err) {
    res.status(404).json({
      status: "fail sort",
      message: err,
    });
  }
});

module.exports = router;
