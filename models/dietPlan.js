const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
    },
    duration: {
      type: String,
      enum: ["weekly", "monthly", "custom"],
      required: true,
    },
    customDuration: {
      type: String,
    },
    pricing: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);
