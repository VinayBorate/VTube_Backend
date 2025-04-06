// utils/otpEmailTemplate.js

function otpEmailTemplate(otp) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center;">
          <img src="https://res.cloudinary.com/duocdrh5f/image/upload/v1743929916/VtubeLogoBlack_wvsgmw.png" alt="VTube Logo" style="width: 100px; height: auto; margin-bottom: 20px;" />
        </div>
  
        <h2 style="text-align: center; color: #333;">Email Verification</h2>
        <p>Hello there,</p>
        <p>Thank you for registering with VTube. Please use the following OTP to verify your email address:</p>
  
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 24px; font-weight: bold; background: #f0f0f0; padding: 10px 20px; border-radius: 5px;">${otp}</span>
        </div>
  
        <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
  
        <p style="margin-top: 40px;">Best regards,<br><strong>VTube Community Team</strong></p>
      </div>
    `;
  }
  
  module.exports = otpEmailTemplate;
  