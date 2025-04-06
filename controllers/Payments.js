const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
const User = require("../models/User");
const PaymentRecord = require("../models/Paymentsrecord");
const mailSender = require("../utils/mailSender");
const paymentEmailTemplate = require("../utils/paymentEmailTemplate");
dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Send payment confirmation email
async function sendPaymentEmail(email, razorpay_order_id, razorpay_payment_id, accountType) {
  try {
    const emailBody = paymentEmailTemplate(razorpay_order_id, razorpay_payment_id, accountType);
    const mailResponse = await mailSender(email, "Payment Successful - VTube", emailBody);
    console.log("Payment email sent:", mailResponse);
  } catch (error) {
    console.log("Error while sending payment email:", error);
    throw error;
  }
}

// Create Order
exports.createOrder = async (req, res) => {
  const { userId, amount } = req.body;

  const shortUserId = userId.substring(0, 8);

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `${shortUserId}${Date.now()}`,
    payment_capture: 1
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      message: 'Your Order is Created',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: "Error While creating order" });
  }
};

// Validate Payment
exports.validateOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, accountType } = req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { accountType: accountType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const paymentRecord = new PaymentRecord({
      userId,
      accountType,
      razorpay_order_id,
      razorpay_payment_id
    });
    await paymentRecord.save();

    await sendPaymentEmail(updatedUser.email, razorpay_order_id, razorpay_payment_id, accountType);

    res.status(200).json({
      success: true,
      message: "Payment successful, user account updated, and record created",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

  } catch (error) {
    console.error("Error updating user and payment record:", error);
    res.status(500).json({ error: "Error updating user and payment record" });
  }
};
