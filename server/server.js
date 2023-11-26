require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/superheroes", async (req, res, next) => {
  //  const employees = await EmployeeModel.find().sort({ created: "desc" });
  //  return res.json(employees);

  try {
    const superheroes = await EmployeeModel.find({ position: "Superhero" });
    console.log(superheroes);
    return res.json(superheroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/search', async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['name', 'created']
    excludedFields.forEach(el => delete queryObj[el]);
    //const query = EmployeeModel.find({ name: { $regex: queryObj, $options: "i" } });
    const query = EmployeeModel.find(queryObj);
    const data = await query

    res.status(200).json(data)

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    })
  }
})


// app.get("/api/levels/:level", async (req, res) => {
//   const level = req.params.level

//   const levels = await EmployeeModel.find({
//     level: { $regex: "^" + level, $options: "i" },
//   });
//   console.log(levels)
//   res.status(200).json(levels);

//   if (!levels) {
//     res.status(404).json({ error: "Level not found" });
//   }
// });

// app.get("/api/positions/:position", async (req, res) => {
//   const position = req.params.position;
//   const positions = await EmployeeModel.find({
//     position: { $regex: "^" + position, $options: "i" }
//   })
//   res.status(200).json(positions)

//   if(!positions) {
//     res.status[404].json({ error:"Position not found" })
//   }
// })



app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
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

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});



app.get("/api/equipment", async (req, res) => {
  try {
    const equipment = await EquipmentModel.find()
    return res.json(equipment);
    
  } catch (error) {
    console.log(error)
  }
})

app.post("/api/equipment", async (req, res) => {
  const equipment = req.body;

  try {
    const data = await EquipmentModel.create(equipment);
    return res.json(data);
  } catch (error) {
    console.log(error)
  }
})

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
