const User=require('../models/User')
const sendEmail=require('../utils/sendEmail')

exports.register=async (req,res,next)=>{
    const {userName,password,lastName,firstName,email}=req.body;
    try{
        const userAlready= await User.findOne({email})
        if(userAlready){
            return res.status(404).json({
                success:false,
                error:{userName:'Email Already Exist'}
            })
        }
        const user=await User.create({
            userName,password,lastName,firstName,email
        })
        res.status(201).json({
            success:true,
            token:user.getSignedToken()
        })
    }catch(err){
        res.status(500).json({
            success:false,
            error:err.message
        })

    }
    
}

exports.login = async (req,res,next)=>{

    const {email,password}=req.body

    if(!email){
        res.status(404).json({
            success:false,
            error:"Username is required."
        })
    }
    if(!password){
        res.status(404).json({
            success:false,
            error:"Password is required."
        })
    }

    try {

        const user= await User.findOne({email})
        .select('+password')
        .exec();

        if(!user){
            return res.status(404).json({
                success:false,
                error:{userName:'Email does not exist'}
            })
        }
        console.log(password)
        const isMatch=await user.matchPasswords(password)
        console.log(isMatch)

        if(!isMatch){
            res.status(404).json({
                success:false,
                error:{password:'Password is incorrect'}
            })
            return;
        }
        res.status(201).json({
            success:true,
            token:user.getSignedToken()
        })

    }catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
        
    }


}

exports.forgotPassword =async (req,res,next)=>{
    const {userName}=req.body;
    console.log('here1')

    try {
        const user =await User.findOne({userName}).exec();

        if(!user){
            return res.status(404).json({
                success:false,
                error:'user hai h nahi'
            })
        }
        console.log('here2')
        
        const resetToken=user.getResetPasswordToken();

        await user.save();
        console.log('here')
        const resetUrl=`http://localhost:3000/resetPassword/${resetToken}`
        const message=`
        <h1>you have requested a password reset</h1>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        await sendEmail({
            to:'hi.secreterror@gmail.com',
            subject:'pass',
            text:message
        })
        res.status(201).json({success:true,data:'Email Sent'})
        
    } catch (error) {
        // user.resetPassword=undefined;
        console.log(error)
        
    }
}

exports.resetPassword =(req,res,next)=>{
    res.send("reset password route")
}