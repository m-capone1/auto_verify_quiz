import express from "express";
import * as vehiclesController from "../controllers/vehiclesController.js";

const router = express.Router();

router
  .route("/")
  .get(vehiclesController.getVehicles)
  .post(vehiclesController.addVehicle);

router
  .route("/:id")
  .put(vehiclesController.updateVehicle)
  .delete(vehiclesController.deleteVehicle);

export default router;
