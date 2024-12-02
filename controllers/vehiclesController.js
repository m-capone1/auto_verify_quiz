import {
  readVehiclesFromFile,
  writeVehiclesToFile,
} from "../utility/fileServices.js";
import { validateVehicleInput } from "../utility/validation.js";

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
    res.status(200).json({ message: "Vehicle was successfully deleted." });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Internal Server Error",
      message: e.message,
    });
  }
};

export { addVehicle, getVehicles, updateVehicle, deleteVehicle };
