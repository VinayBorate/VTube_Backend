const cloudinary = require('cloudinary').v2;
const Video = require('../models/Video')
require("dotenv").config();

async function uploadFileToCloudinary(file, folder) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function isFileSupported(type, supportType) {
    return supportType.includes(type);
}

exports.videoUpload = async (req, res) => {
    try {
        // Data fetch
        const { videoTitle, description, adminEmail, adminPic } = req.body;
        console.log(videoTitle, description, adminEmail, adminPic);

        const file = req.files.videoFile; // Key used in POSTMAN
        const thumbnail = req.files.thumbnailPic; // Thumbnail file
        console.log(file, thumbnail);

        // Validate video file
        const supportType = ["mp4","avi","mov","mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);
        
        if (!isFileSupported(fileType, supportType)) {
            return res.status(400).json({
                success: false,
                message: 'File is Not Supported'
            });
        }

        // Upload video to Cloudinary
        console.log("Uploading video to Cloudinary Vtube");
        const videoResponse = await uploadFileToCloudinary(file, process.env.CLOUD_FOLDER);
        console.log(videoResponse);

        // Upload thumbnail to Cloudinary
        console.log("Uploading thumbnail to Cloudinary Vtube");
        const thumbnailResponse = await uploadFileToCloudinary(thumbnail, process.env.CLOUD_FOLDER);
        console.log(thumbnailResponse);

        // Save the entry in the DB
        const videoData = await Video.create({
            videoTitle,
            description,
            videoURL: videoResponse.secure_url,
            thumbnailURL: thumbnailResponse.secure_url,
            adminEmail,
            adminPic,
        });

        res.json({
            success: true,
            videoURL: videoResponse.secure_url,
            thumbnailURL: thumbnailResponse.secure_url,
            message: 'Video and Thumbnail Uploaded Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong',
        });
    }
}
