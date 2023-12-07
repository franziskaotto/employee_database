const express = require("express");
const router = express.Router();
const LevelModel = require("../db/level.model")

router.get("/", async (req, res) => {
  try {
    const { level, sort } = req.query;
    let query = {}
    let sorting = {}
    const levelName = level.levelName

    console.log(sort)

    if(level) {
      query = {
        level: await LevelModel.find({ name: level })
      };
    }
    
    if (sort) {
      sorting.level = sort === "desc" ? -1 : 1;
    }

    const employees = await EmployeeModel.find(query)
    .populate("level")
    .sort(sorting)

    return res.json(employees)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "internal server error" });
    
  }
})

module.exports = router;
