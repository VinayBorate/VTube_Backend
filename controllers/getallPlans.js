const Plans = require('../models/Plans');

exports.getallPlans = async (req,res) => {
    try {
        const plans = await Plans.find();

        if(plans.length === 0){
            return res.status(404).json({
                success: false,
                message: "No Plan Exist",
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Plans fetched successfully',
            plans,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error While fetching Plans',
            error: error.message,
        });
        
    }
}