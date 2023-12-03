const express = require("express");
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");

router.get("/", async (req, res) => {
  try {
    const equipment = await EquipmentModel.find();
    return res.json(equipment);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
  } catch (error) {
    console.log(error);
  }
});

//TODO: Update wegeben

router.patch("/update/:id", async (req, res) => {
  console.log("patch over try");

  try {
    const updatedEquipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedEquipment) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found" });
    } else {
      res.json({ success: true, data: updatedEquipment });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req, res) => {
  const equipment = req.body;

  try {
    const data = await EquipmentModel.create(equipment);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;