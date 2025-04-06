function paymentEmailTemplate(orderId, paymentId, accountType) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/duocdrh5f/image/upload/v1743929916/VtubeLogoBlack_wvsgmw.png" alt="VTube Logo" style="width: 100px; height: auto;" />
        </div>
  
        <h2 style="text-align: center; color: #28a745;">Payment Successful 🎉</h2>
  
        <p>Hi there,</p>
        <p>Thank you for your purchase! We're excited to have you as a <strong>${accountType}</strong> member of VTube.</p>
  
        <div style="margin: 30px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #28a745;">
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Account Type:</strong> ${accountType}</p>
        </div>
  
        <p>If you have any questions or concerns, feel free to contact our support team.</p>
  
        <p style="margin-top: 40px;">Best regards,<br><strong>VTube Community Team</strong></p>
      </div>
    `;
  }
  
  module.exports = paymentEmailTemplate;
  