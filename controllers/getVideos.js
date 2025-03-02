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
            message: 'Videos fetched successfully',
            videos, // sending the fetched videos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching videos',
            error: error.message,
        });
    }
};
