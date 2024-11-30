import express from "express";

import vehiclesRoute from "./routes/vehiclesRoute.js";

const app = express();
const PORT = 8080;

app.use("/vehicles", vehiclesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
