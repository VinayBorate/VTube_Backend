const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
        videoTitle:{
            type:String,
            require:true,
        },
        description:{
            type:String,
        },
        videoURL:{
            type:String,
        },
         thumbnailURL:{
            type:String,
        },
        adminEmail:{
           type:String,
        },
        adminPic:{
           type:String,
        },
        videoComments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Comments"
            }
        ],
        videoAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        videoLikes:{
            type:String,
            ref:"Likes"
        },
        videoUnlike:{
               type:String,
               ref:"Unlikes"
        } 
})

module.exports = mongoose.model("Video",videoSchema);