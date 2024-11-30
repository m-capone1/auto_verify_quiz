import fs from "fs";

const jsonPath = "../data/vehicles.json";

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

    const newVehicle = {
      id,
      year,
      make,
      model,
      trim,
    };
  } catch (e) {}
};

const getVehicles = async (req, res) => {
  try {
  } catch (e) {}
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
