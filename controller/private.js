exports.getPrivateData=(req,res,next)=>{
    res.status(200).json({
        succsess:true,
        data:"ypu got the accesss to this rouytr"
    })
}