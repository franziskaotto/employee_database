const express = require("express");
const router = express.Router();

const EmployeeModel = require("../db/employee.model");
const NotesModel = require("../db/notes.model")

//JUST FOR TESTING
router.get("/", async (req, res) => {
  try {
    const employee = await EmployeeModel.find()
    return res.json(employee)
    
  } catch (error) {
    return res.status(500).json({ "internal server Error:": error });
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const employee = await EmployeeModel.findById(id)
    return res.status(200).json(employee)
    
  } catch (error) {
    return res.status(500).json({"internal server Error:": error})
  }
});


router.patch("/:id", async (req, res) => {

  try {
    const updatedNotes = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedNotes) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    } else {
      res.json({ success: true, data: updatedNotes });
    }

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  const newNote = req.body;
  console.log(newNote)

  try {
    const data = await NotesModel.create(newNote);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
