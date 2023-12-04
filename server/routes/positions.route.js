

const express = require("express");
const router = express.Router();

const PositionsModel = require("../db/positions.model.js")

router.get("/", async (req, res) => {
  try {
    const positions = await PositionsModel.find()
    return res.json(positions)
  } catch (error) {
    console.error("Error fetching positions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;