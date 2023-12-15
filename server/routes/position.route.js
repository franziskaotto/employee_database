
const express = require("express");
const PositionModel = require("../db/position.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const positions = await PositionModel.find();
    return res.json(positions);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
