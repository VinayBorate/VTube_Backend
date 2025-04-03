const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const Like = require("../models/Likes");

// exports.getLike = async(req , res) => {
//     try {
//         const video = await Video.findById(req.params.videoId).populate("videoLikes");
//         const likeCount = video.videoLikes.length;
//         const likedByUser = video.videoLikes.includes(req.query.userId);
    
//         res.json({ likeCount, likedByUser });
//       } catch (error) {
//         res.status(500).json({ message: "Error fetching likes" });
//       }
// }

exports.getLike = async (req, res) => {
  try {
      const video = await Video.findById(req.params.videoId).populate("videoLikes");

      if (!video) return res.status(404).json({ message: "Video not found" });

      const likeCount = video.videoLikes ? video.videoLikes.length : 0;
      const likedByUser = video.videoLikes?.some(like => like.user.toString() === req.query.userId) || false;
  
      res.json({ likeCount, likedByUser });
  } catch (error) {
      res.status(500).json({ message: "Error fetching likes" });
  }
};




exports.LikeUnlikeVideo = async(req,res) => {

    try {
        const { userId } = req.body;
        const video = await Video.findById(req.params.videoId);
        
        if (!video) return res.status(404).json({ message: "Video not found" });
    
        const existingLike = await Like.findOne({ video: video._id, user: userId });
    
        if (existingLike) {
          await Like.deleteOne({ _id: existingLike._id });
          video.videoLikes.pull(existingLike._id);
          await video.save();
          return res.json({ liked: false, likeCount: video.videoLikes.length });
        }
    
        const newLike = new Like({ video: video._id, user: userId });
        await newLike.save();
        video.videoLikes.push(newLike._id);
        await video.save();
    
        res.json({ liked: true, likeCount: video.videoLikes.length });
      } catch (error) {
        res.status(500).json({ message: "Error liking video" });
      }

}


