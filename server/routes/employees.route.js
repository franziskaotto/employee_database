const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");



router.get("/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  console.log("get")
  return res.json(employees);
});

router.get("/sort/:sorted", async (req, res) => {
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

router.get("/superheroes", async (req, res, next) => {
  try {
    const superheroes = await EmployeeModel.find({ position: "Superhero" });
    return res.json(superheroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["name", "created"];
    excludedFields.forEach((el) => delete queryObj[el]);

    for (const key in queryObj) {
      queryObj[key] = { $regex: `^${queryObj[key]}`, $options: "i" };
    }


    const query = EmployeeModel.find(queryObj);
    const data = await query;

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await EmployeeModel.findById(id);
  return res.json(employee);
});

router.post("/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;