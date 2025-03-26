// Import Express
const express = require("express");
const router = express.Router();

//***********************Import controllers*************************************

const { sendOTP, signUp, login, changePassword,logOut } = require("../controllers/Auth");
const {videoUpload} = require("../controllers/fileUpload");
const {getAllVideos} = require("../controllers/getVideos");
const orderRoutes = require("./orderRoutes"); 
const {getallPlans} = require('../controllers/getallPlans');



//Import middleware for authentication
const { auth } = require("../middlewares/auth");



//*************************Define routes*******************************
router.post("/user/sendotp", sendOTP); // Corrected: OTP should be sent via POST
router.post("/user/signup", signUp); // SignUp should be a POST request
router.post("/user/login", login); // Login should be a POST request
router.put("/user/changepassword",changePassword); // Change password should be a PUT request with authentication
router.post("/user/videoupload",videoUpload);// Helps to upload the Video
router.get("/user/getAllVideo",getAllVideos);
router.get("/user/logout",logOut);
router.get("/user/getAllPlans",getallPlans);

// Use order routes
router.use(orderRoutes);

// Export router
module.exports = router;
