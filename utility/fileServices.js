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

export { readVehiclesFromFile, writeVehiclesToFile };
