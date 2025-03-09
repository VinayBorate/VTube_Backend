const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        require:true,
        trim:true,
    },
    lastName :{
        type:String,
        require:true,
        trim:true,
    },
    email :{
        type:String,
        require:true,
        trim:true,
    },
    password :{
        type:String,
        require:true,
        trim:true,
    },
    accountType :{
        type:String,
        enum:["free","bronze","silver","gold"],
        default: "free", 
        // Default value set to "free"
    },
    downloadVideo: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    image:{
        type:String,
    }

});

module.exports = mongoose.model("User",userSchema);