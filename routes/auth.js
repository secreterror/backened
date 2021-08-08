const express=require('express')
const router=express.Router();
const {register, login, forgotPassword, resetPassword}=require('../controller/auth')

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").post(resetPassword);

module.exports=router