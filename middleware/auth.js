const jwt =require('jsonwebtoken')
const User =require('../models/User')
const JWT_SECRETS='da69150832cfbc6fba2f37173641e5404060d09e4398f83f7db4f5bde5b0c7d932eb67';


exports.protect=async (req,res,next)=>{
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({
            success:false,
            error:'not authorized'
        })
    }

    try {
        const decoded=jwt.verify(token,JWT_SECRETS);
        const user =await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({
                success:false,
                error:'No user find with this id'
            })
        }

        req.user=user;
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            error:'Not authorized'
        })
    }
}