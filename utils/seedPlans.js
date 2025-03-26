const Plan = require("../models/Plans");

const plans = [
  { name: "Bronze", amount: 10, features: ["Feature 1", "Limited access"] },
  { name: "Silver", amount: 50, features: ["Feature 2", "Extended access"] },
  { name: "Gold", amount: 100, features: ["24/7 support", "Unlimited access"] },
];

const seedPlans = async () => {
  try {
    for (const plan of plans) {
      const existingPlan = await Plan.findOne({ name: plan.name });
      if (!existingPlan) {
        await Plan.create(plan);
        console.log(`Added plan: ${plan.name}`);
      }
    }
  } catch (error) {
    console.error("Error seeding plans:", error);
  }
};

module.exports = seedPlans;
