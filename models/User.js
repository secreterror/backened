const mongoose=require('mongoose')
const crypto =require('crypto')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const JWT_SECRETS='da69150832cfbc6fba2f37173641e5404060d09e4398f83f7db4f5bde5b0c7d932eb67';
const EXPIRES_IN= '10min';

const UserSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide a first name."],
    },
    lastName:{
        type:String,
        required:[true,"Please provide a last name."],
    },
    userName:{
        type:String,
        required:[true,"Please provide a username."],
        unique:[true,"Username already taken."],
        minlength:[5,'Length of password should be atleast 5.'],
    },
    password:{
        type:String,
        require:[true, "Please add a password."],
        minlength:[4,'Length of password should be atleast 4.'],
        select:false
    },
    email:{
        type:String,
        validate:{
            validator:function(email){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email)
            },
            message:()=>'Please provide a valid email'
        },
        required:[true, "Please provide an email."],

    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
})

UserSchema.pre("save",async function(next){
    console.log('here1')
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

    next();

})

UserSchema.methods.matchPasswords=async function(password){
    console.log(this.password)
    console.log('hehe ',await bcrypt.compare(password,this.password) )
    return await bcrypt.compare(password,this.password)
}
UserSchema.methods.getSignedToken=function(){
    return jwt.sign({id:this._id},JWT_SECRETS,{
        expiresIn:EXPIRES_IN
    })

}
UserSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest('hex')

    this.resetPasswordExpire=Date.now() +10 * (60*1000);

    return resetToken;

}

const User=mongoose.model("User",UserSchema);
module.exports=User
