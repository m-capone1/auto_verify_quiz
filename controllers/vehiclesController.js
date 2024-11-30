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
      message: "Internal Server Error. Unable to add vehicle.",
      error: e,
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
      message: "Internal Server Error. Unable to get vehicle list.",
      error: e,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { year, make, model, trim } = req.body;
    const vehicleId = parseInt(req.params.id);

    if (!year || !make || !model || !trim || !vehicleId) {
      return res.status(400).json({
        error: e,
        message:
          "Missing required fields. Please provide year, make, model, and trim in the request body.",
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

    const updateVehicle = {
      id: vehicleId,
      year,
      make,
      model,
      trim,
    };

    const findVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    if (!findVehicle) {
      return res.status(404).json({
        error: "Vehicle not found.",
        message: `Vehicle with ID ${vehicleId} not found.`,
      });
    }

    let vehicleFilter = [];
    vehicles.forEach((vehicle) => {
      if (vehicle.id !== vehicleId) {
        vehicleFilter.push(vehicle);
      } else {
        vehicleFilter.push(updateVehicle);
      }
    });

    fs.writeFile(
      jsonPath,
      JSON.stringify(vehicleFilter, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).json({
            error: "Unable to write to file.",
            message: err.message,
          });
        }

        return res.status(200).json({
          message: `Successfully updated vehicle with ID ${vehicleId}.`,
          vehicle: updateVehicle,
        });
      }
    );
  } catch (e) {}
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);

    if (!vehicleId) {
      return res.status(400).json({
        error: e,
        message:
          "Missing vehicle ID. Please provide the vehicle ID as a request parameter.",
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

    const findVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    if (!findVehicle) {
      return res.status(404).json({
        error: "Vehicle not found.",
        message: `Vehicle with ID ${vehicleId} not found.`,
      });
    }

    let vehicleFilter = [];
    vehicles.forEach((vehicle) => {
      if (vehicle.id !== vehicleId) {
        vehicleFilter.push(vehicle);
      }
    });

    fs.writeFile(
      jsonPath,
      JSON.stringify(vehicleFilter, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          return res.status(500).json({
            error: "Unable to write to file.",
            message: err.message,
          });
        }

        return res.status(200).json({
          message: `Successfully deleted vehicle with ID ${vehicleId}.`,
        });
      }
    );
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error. Unable to delete vehicle.",
      error: e,
    });
  }
};

export { addVehicle, getVehicles, updateVehicle, deleteVehicle };
