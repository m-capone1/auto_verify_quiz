const validateVehicleInput = (year, make, model, trim) => {
  const errors = [];
  if (!year || typeof year !== "number" || year < 1900)
    errors.push("Invalid year. Year must be a number.");
  if (!make || typeof make !== "string" || make.trim() === "")
    errors.push("Invalid make. Make must be a valid string.");
  if (!model || typeof model !== "string" || model.trim() === "")
    errors.push("Invalid model. Model must be a valid string.");
  if (!trim || typeof trim !== "string" || trim.trim() === "")
    errors.push("Invalid trim. Trim must be a valid string.");
  return errors.length > 0 ? errors.join(", ") : null;
};

export { validateVehicleInput };
