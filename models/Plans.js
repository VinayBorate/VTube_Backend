const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  plantitle: {type: String, required: true, unique: true},
  amount: { type: Number, required: true },
  features: { type: [String], default: [] },
});

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
