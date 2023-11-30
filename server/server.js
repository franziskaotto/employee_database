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


app.get("/api/employees/sort/:sorted", async (req, res) => {
  try {
    const sortedBy = req.params.sorted;
    const sortedEmployees= await EmployeeModel.find().sort({ [sortedBy]: "asc" });
    return res.json(sortedEmployees);
    
  } catch (err) {
     res.status(404).json({
       status: "fail sort",
       message: err,
     });
  }
});




app.get("/api/employees/superheroes", async (req, res, next) => {
  try {
    const superheroes = await EmployeeModel.find({ position: "Superhero" });
    console.log(superheroes);
    return res.json(superheroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["name", "created"];
    excludedFields.forEach((el) => delete queryObj[el]);

     for (const key in queryObj) {
       queryObj[key] = { $regex: `^${queryObj[key]}`, $options: "i" };
     }

    //const query = EmployeeModel.find({ level : { $regex: queryObj, $options: "i" } });
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


app.get("/api/employees/:id", async (req, res) => {
  const id = req.params.id
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/update/:id", async (req, res, next) => {
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

//////////////////////////////////////////////////////////////////////////////
app.get("/api/equipment/", async (req, res) => {
  try {
    const equipment = await EquipmentModel.find();
    return res.json(equipment);
  } catch (error) {
    console.log(error);
  }
});


app.get("/api/equipment/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    return res.json(equipment);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/api/equipment/update/:id", async (res, req) => {
  console.log("patch over try");

  try {
    const updatedEquipment = await EquipmentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updatedEquipment });

    if (!updatedEquipment) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
        
        
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



app.post("/api/equipment/", async (req, res) => {
  const equipment = req.body;

  try {
    const data = await EquipmentModel.create(equipment);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/equipment/:id", async (req, res) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = await equipment.delete();
    return res.json(deleted);
  } catch (error) {
    console.log(error);
  }
});

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
