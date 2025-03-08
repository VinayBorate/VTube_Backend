const User = require("../models/User");
const OTP = require("../models/OTP");
const optGenerator = require("otp-generator");
const { response } = require("express");
const Video = require("../models/Video");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mailSender = require('../utils/mailSender');

//send OTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from request ki body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user already exist then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already Register",
            });
        }

        //generate otp
        var otp = optGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated is :", otp);

        //check uniqie otp or not
        let result = await OTP.findOne({ otp: otp });

        //if otp found then regenerating otp
        while (result) {
            otp = optGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //creat an entry for the OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // Send OTP to user
          await mailSender(email, "VTube - OTP Verification", `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`);

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//signUp

exports.signUp = async (req, res) => {
    try {
        //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            createPassword,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        //validate karo
        if (
            !firstName ||
            !lastName ||
            !email ||
            !createPassword ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are require",
            });
        }
        //pass and cnfpass ko match karo
        if (createPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword value does not Match",
            });
        }
        //.check user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already Registed",
            });
        }

        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        console.log(recentOtp);
        //validate OTP
        if (recentOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP NotFound",
            });
        } else if (otp !== recentOtp[0].otp.toString()) {   
            //Invalild Otp
            return res.status(400).json({
                success: false,
                message: "Invalild OTP",
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(createPassword, 10);

        //entry create in DB
        const downloadDetail = await Video.create({
            videoTitle: null,
            description: null,
            myvideo: null,
            videoComments: null,
            videoAdmin: null,
            videoLikes: null,
            videoUnlike: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            downloadVideo: downloadDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });

        return res.status(200).json({
            success:true,
            message:'User is registered SuccessFully',
            user,
        })
    } 
    catch (error) { 
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered Please try again",
        })
    }
};

//Login
exports.login = async (req,res) => {
    try {
            //1 .get data from the req body
            const {email,password} = req.body;
            //2 .validate the data
            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message:'All fields are require Please try again'
                })
            }
            //3 .user check exist or not 
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({
                    success:false,
                    message:'User Not registered Please SignUp'
                })
            }
            //4. check the password 
            if(await bcrypt.compare(password,user.password)){
                const payload = {
                    email:user.email,
                    id:user._id,
                    accountType:user.accountType,
                }
                //5 .make the JWT token
                const token = jwt.sign(payload,process.env.JWT_SECRET,{
                    expiresIn:"2h",
                });
                user.token = token;
                // to hide the pass
                user.password = undefined; 

                //6. create the Cookie and send the response
                const options = {
                        expires:new Date(Date.now()+ 3*24*60*60*1000), // expires in 3 days
                        httpOnly:true,
                }
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:'Logged in Successfully'
                })
            }
            else{
                return res.status(401).json({
                    success:false,
                    message:"Password is incorrect"
                });
            } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure Please Try again'
        })
    }
}
//changePassword

exports.changePassword = async (req, res) => {
    try {
        // 1. Get the data from the body
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const userId = req.user?.id; // Assuming you're getting user ID from JWT middleware

        // 2. Validate the data
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 3. Check if newPassword matches confirmNewPassword
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // 4. Find the user (assuming you have authentication middleware providing user ID)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 5. Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // 6. Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // 7. Update password in database
        await User.findByIdAndUpdate(
            userId,
            { password: hashedNewPassword },
            { new: true }
        );

        // 8. Send confirmation email
        const email = user.email;
        const title = "Password Changed Successfully";
        const body = `
            <h1>Password Update Confirmation</h1>
            <p>Dear ${user.firstName},</p>
            <p>Your password has been successfully updated on ${new Date().toLocaleString()}.</p>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p>Best regards,<br>VTube Community Team</p>
        `;

        await mailSender(email, title, body);

        // 9. Return success response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to change password. Please try again",
            error: error.message,
        });
    }
};

//logout

exports.logOut = async (req,res) =>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,  // Use secure cookies in production
        sameSite: "None"
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
}