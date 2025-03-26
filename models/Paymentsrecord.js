const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({
    userId: {
        type:String,
        require:true,
    },
    accountType :{
        type:String,
        require:true,
    },
    razorpay_order_id:{
        type:String,
        require:true,
    },
    razorpay_payment_id:{
        type:String,
        require:true,
    }

});

module.exports = mongoose.model("PaymentRecord",PaymentSchema);