import fs from "node:fs/promises";
const jsonPath = "./data/vehicles.json";

const readVehiclesFromFile = async () => {
  try {
    const data = await fs.readFile(jsonPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const writeVehiclesToFile = async (vehicles) => {
  try {
    await fs.writeFile(jsonPath, JSON.stringify(vehicles, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to file:", err);
    throw new Error(`Unable to write file: ${err.message}`);
  }
};

const validateVehicleInput = (year, make, model, trim) => {
  const errors = [];
  if (!year || typeof year !== "number" || year < 1900)
    errors.push("Invalid year");
  if (!make || typeof make !== "string" || make.trim() === "")
    errors.push("Invalid make");
  if (!model || typeof model !== "string" || model.trim() === "")
    errors.push("Invalid model");
  if (!trim || typeof trim !== "string" || trim.trim() === "")
    errors.push("Invalid trim");
  return errors.length > 0 ? errors.join(", ") : null;
};

const addVehicle = async (req, res) => {
  try {
    const { year, make, model, trim } = req.body;

    const validationError = validateVehicleInput(year, make, model, trim);
    if (validationError) {
      return res.status(400).json({
        error: "Validation Error",
        message: validationError,
      });
    }

    const vehicles = await readVehiclesFromFile();

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
    await writeVehiclesToFile(vehicles);

    res.status(201).json(newVehicle);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await readVehiclesFromFile();

    res.status(200).json(vehicles);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { year, make, model, trim } = req.body;
    const vehicleId = parseInt(req.params.id);

    const validationError = validateVehicleInput(year, make, model, trim);
    if (validationError) {
      return res.status(400).json({
        error: "Validation Error",
        message: validationError,
      });
    }

    if (!vehicleId) {
      return res.status(400).json({
        error: "Missing vehicle ID.",
        message: "Please provide the vehicle ID as a request parameter.",
      });
    }

    const vehicles = await readVehiclesFromFile();

    const findVehicleIndex = vehicles.findIndex(
      (vehicle) => vehicle.id === vehicleId
    );

    if (findVehicleIndex === -1) {
      return res.status(404).json({
        error: "Vehicle not found.",
        message: `Vehicle with ID ${vehicleId} not found.`,
      });
    }

    vehicles[findVehicleIndex] = { id: vehicleId, year, make, model, trim };

    await writeVehiclesToFile(vehicles);
    res.status(200).json(vehicles[findVehicleIndex]);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = parseInt(req.params.id);

    if (!vehicleId) {
      return res.status(400).json({
        error: "Missing vehicle ID.",
        message: "Please provide the vehicle ID as a request parameter.",
      });
    }

    const vehicles = await readVehiclesFromFile();

    const findVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    if (!findVehicle) {
      return res.status(404).json({
        error: "Vehicle not found.",
        message: `Vehicle with ID ${vehicleId} not found.`,
      });
    }

    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.id !== vehicleId
    );

    await writeVehiclesToFile(updatedVehicles);
    res.status(200).json();
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

export { addVehicle, getVehicles, updateVehicle, deleteVehicle };
