// const express = require("express");
// const { createOrder } = require("../controllers/Payments");

// const router = express.Router();

// router.post("/payment/orders", createOrder);

// module.exports = router;




const express = require("express");
const { createOrder, validateOrder} = require("../controllers/Payments");

const router = express.Router();

router.post("/order", createOrder);
router.post("/validateOrder", validateOrder);

module.exports = router;
