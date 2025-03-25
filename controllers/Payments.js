const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const User = require("../models/User");
const PaymentRecord = require("../models/Paymentsrecord");
require("dotenv").config();

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
exports.createOrder = async (req, res) => {
  const {userId,amount} = req.body;

  const options = {
    amount: amount * 100, // Convert to smallest currency unit
    currency: "INR",
    receipt: `order_${userId}_${Date.now()}`,
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    // res.json({ orderId: order.id });
    res.status(200).json({
                     success:true,
                     message: 'Your Order is Created',
                     order,
                 });
  } catch (error) {
    res.status(500).json({ error: "Error While creating order" });
  }
};

// verify payment

exports.validateOrder = async(req,res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
}









