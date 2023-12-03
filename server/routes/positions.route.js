const express = require("express");
const router = express.Router();

const PositionModel = require("../db/position.model")


router.get("/", async (req, res) => {
  try {
    const postionsData = await PositionModel.find();
    return res.json(postionsData);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

module.exports = router;
