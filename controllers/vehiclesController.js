import fs from "node:fs";

const jsonPath = "./data/vehicles.json";

const addVehicle = async (req, res) => {
  try {
    const { year, make, model, trim } = req.body;

    if (!year || !make || !model || !trim) {
      return res.status(400).json({
        error: "Missing required fields",
        message:
          "Please provide year, make, model, and trim in the request body.",
      });
    }

    let vehicles = [];

    try {
      const vehiclesData = await fs.readFileSync(jsonPath, "utf8");
      vehicles = JSON.parse(vehiclesData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Unable to read file.",
        message: err.message,
      });
    }

    const newVehicleId =
      vehicles.length > 0 ? vehicles[vehicles.length - 1].id + 1 : 1;

    const newVehicle = {
      id: newVehicleId,
      year,
      make,
      model,
      trim,
    };

    vehicles.push(newVehicle);

    try {
      fs.writeFile(jsonPath, JSON.stringify(vehicles, null, 2), (err) => {
        return res.status(201).json(newVehicle);
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Unable to read file.",
        message: err.message,
      });
    }
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error.",
      message: "Internal Server Error.",
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    let vehicles = [];

    try {
      const data = await fs.readFileSync(jsonPath, "utf8");
      vehicles = JSON.parse(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Unable to read file.",
        message: err.message,
      });
    }

    res.status(200).json({ vehicles });
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error.",
      message: "Internal Server Error.",
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
  } catch (e) {}
};

const deleteVehicle = async (req, res) => {
  try {
  } catch (e) {}
};

export { addVehicle, getVehicles, updateVehicle, deleteVehicle };
