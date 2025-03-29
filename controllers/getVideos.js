const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();

        if (videos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No videos found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All Videos fetched successfully',
            videos, // sending the fetched videos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching All videos',
            error: error.message,
        });
    }
};

exports.getVideoByID = async (req, res) => {
    const { videoId } = req.params; // Extract videoId from URL params

    try {
        const video = await Video.findById(videoId);
        
        if (!video) {
            return res.status(404).json({
                success: false,
                message: "No video found with this ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Video fetched successfully",
            video, // Sending the fetched video
        });
    } catch (error) {
        console.error("Error fetching video:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching video",
            error: error.message,
        });
    }
};