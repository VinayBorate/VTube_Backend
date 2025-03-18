const File = require('../models/Video');
const cloudinary = require('cloudinary').v2;
const Video = require('../models/Video')
require("dotenv").config();


async function uploadFileToCloudinary(file, folder) {
    const options = {folder};
    console.log("temp file path",file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}



function isFileSupported(type,supportType){
    return supportType.includes(type);
}

exports.videoUpload = async(req,res) => {
    try {
        //data fetch
        const {videoTitle,description,adminEmail,adminPic} = req.body;
        console.log(videoTitle,description,adminEmail,adminPic);

        const file = req.files.videoFile;           //   key    use in  POSTMAN
        console.log(file);

        //validate
        const supportType = ["mp4","avi","mov","mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        if(!isFileSupported(fileType,supportType)){
            return res.status(400).json({
                success:false,
                message:'File is Not Supported'
            })
        }

        //Now File formate is Supported so Upload on Cloudnary
        console.log("Uploading to Cloudinary Vtube");
        const response = await uploadFileToCloudinary(file,process.env.CLOUD_FOLDER);
        console.log(response);

        //Save the Entry in the DB
        const videoData = await Video.create({
            videoTitle,
            description,
            videoURL: response.secure_url,
            adminEmail,
            adminPic,
        });

        res.json({
            success:true,
            videoURL:response.secure_url,
            message: 'Video Is Uploaded SuccessFully',
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message: 'Something Went Wrong',
        })
        
    }
}