const Video = require('../models/Video');

exports.getCommentsByVideoId = async(req,res) => {
    try {
        const { videoId } = req.params;

        // Populate the comments with user details
        const video = await Video.findById(videoId)
            .populate({
                path: "videoComments",
                populate: { path: "user", select: "name email image" } // Fetch user details
            });

        if (!video) {
            return res.status(404).json({ message: "Video not found To get Comments" });
        }

        res.json({ comments: video.videoComments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}