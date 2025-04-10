const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoTitle: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  videoURL: {
    type: String,
  },
  thumbnailURL: {
    type: String,
  },
  adminEmail: {
    type: String,
  },
  adminPic: {
    type: String,
  },
  videoComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videoAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  videoLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  videoUnlike: {
    type: String,
    ref: "Unlikes",
  },
});

module.exports = mongoose.model("Video", videoSchema);
