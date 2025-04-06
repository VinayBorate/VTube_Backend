
const mongoose = require("mongoose")
const mailSender = require('../utils/mailSender')
const otpEmailTemplate = require('../utils/otpEmailTemplate');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//function to send OTP email
async function sendVerificationEmail(email,otp){
    try {
    const emailBody = otpEmailTemplate(otp);
    const mailResponse = await mailSender(email, "Verification Email from VTube", emailBody);
        console.log(mailResponse);

    } catch (error) {
        console.log("error while sending OTP mail",error);
        throw error;
    }
}

//pre Middle ware 
OTPSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);