const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth 
exports.auth = async(req,res,next) =>{
    try {
        //extract token
        const token = req.cookies.token
                        ||req.body.token
                        ||req.header("Authorization").replace("Bearer","");
        
        // if the token is missing then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is Missing'
            })
        }

        //verify the Token 
        try{
          const decode = jwt.verify(token,process.env.JWT_SECRET);
          console.log(decode);
          req.user = decode; 
        }
        catch(err){
            // verification - issue
            return res.status(401).json({
                success:false,
                message:'Token is Invalid'
            })
        }
        //move to the next Middleware
        next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while Validating the Token'
        })
    }
}

// "free","bronze","silver","gold"

//isFreePlan

exports.isFreePlan = async (req,res,next) => {
    try {
        if(req.user.accountType !== 'free'){
            return res.status(401).json({
                success:false,
                message:'This I the Protected route for FreePlan Users'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be Verifired , please try again'
        })
    }

}

//isBronzePlan

exports.isBronzePlan = async (req,res,next) => {
    try {
        if(req.user.accountType !== 'bronze'){
            return res.status(401).json({
                success:false,
                message:'This I the Protected route for BronzePlan Users'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be Verifired , please try again'
        })
    }

}

//isSilverPlan
exports.isSilverPlan = async (req,res,next) => {
    try {
        if(req.user.accountType !== 'silver'){
            return res.status(401).json({
                success:false,
                message:'This I the Protected route for SilverPlan Users'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be Verifired , please try again'
        })
    }

}

//isGoldPlan

exports.isGoldPlan = async (req,res,next) => {
    try {
        if(req.user.accountType !== 'gold'){
            return res.status(401).json({
                success:false,
                message:'This I the Protected route for GoldPlan Users'
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be Verifired , please try again'
        })
    }

}






