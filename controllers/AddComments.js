    const Comment = require("../models/Comments");
    const Video = require("../models/Video");
    require("dotenv").config();


    //Add Comments

    exports.addComments = async (req, res) => {
        try {
            const { text, user } = req.body;  
            const { videoId } = req.params;
    
            // Create a new comment
            const newComment = new Comment({ 
                text,
                user,  
                video: videoId
            });
    
            await newComment.save();
    
            // Push the comment ID to the video's `videoComments` array
            await Video.findByIdAndUpdate(videoId, { 
                $push: { videoComments: newComment._id } 
            });
    
            res.status(201).json({ message: "Comment added successfully", comment: newComment });
    
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    