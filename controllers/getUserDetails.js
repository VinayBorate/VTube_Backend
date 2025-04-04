// const User = require("../models/User");

// // Controller to get user details excluding the password
// exports.getUserDetails = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you attach user to req.user from middleware (e.g. JWT)
    
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract actual userId

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};




