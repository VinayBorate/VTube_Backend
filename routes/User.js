// Import Express
const express = require("express");
const router = express.Router();

//***********************Import controllers*************************************

const { sendOTP, signUp, login, changePassword } = require("../controllers/Auth");
const { localFileUpload } = require("../controllers/fileUpload");
const {videoUpload} = require("../controllers/fileUpload")

//Import middleware for authentication
const { auth } = require("../middlewares/auth");



//*************************Define routes*******************************
router.post("/user/sendotp", sendOTP); // Corrected: OTP should be sent via POST
router.post("/user/signup", signUp); // SignUp should be a POST request
router.post("/user/login", login); // Login should be a POST request
router.put("/user/changepassword",changePassword); // Change password should be a PUT request with authentication
router.post("/user/videoupload",videoUpload);

// Export router
module.exports = router;
