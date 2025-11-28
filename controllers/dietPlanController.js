const DietPlan = require("../models/dietPlan");
const { dietPlanValidation } = require("../utils/validation");

// Create Diet Plan
exports.createDietPlan = async (req, res) => {
  try {
    const { error } = dietPlanValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const dietPlan = new DietPlan(req.body);
    await dietPlan.save();
    res.status(201).json(dietPlan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all Diet Plans
exports.getDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single Diet Plan
exports.getDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: "Diet plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Diet Plan
exports.updateDietPlan = async (req, res) => {
  try {
    const { error } = dietPlanValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const plan = await DietPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plan) return res.status(404).json({ error: "Diet plan not found" });
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Diet Plan
exports.deleteDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findByIdAndDelete(req.params.id);
    if (!plan) return res.status(404).json({ error: "Diet plan not found" });
    res.json({ message: "Diet plan deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
