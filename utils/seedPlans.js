const Plan = require("../models/Plans");

const plans = [
  { name: "Gold", plantitle: "GOLD", amount: 100, features: ["24/7 support", "Unlimited access"] },
  { name: "Silver", plantitle: "SILVER",amount: 50, features: ["Feature 2", "Extended access"] },
  { name: "Bronze", plantitle: "BRONZ",amount: 10, features: ["Feature 1", "Limited access"] },
];

const seedPlans = async () => {
  try {
    for (const plan of plans) {
      const planNameLower = plan.name.toLowerCase(); // Convert name to lowercase
      const existingPlan = await Plan.findOne({ name: planNameLower });

      if (!existingPlan) {
        await Plan.create({ ...plan, name: planNameLower });
        console.log(`Added plan: ${planNameLower}`);
      }
    }
  } catch (error) {
    console.error("Error seeding plans:", error);
  }
};

module.exports = seedPlans;
