
const express = require("express");
const PositionModel = require("../db/position.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const positions = await PositionModel.find();
    return res.json(positions);
  } catch (error) {
    res.status(500).json({error: "internal Server Error"});
  }
});



module.exports = router;
