const nodemailer=require('nodemailer')

const sendEmail=(options)=>{
    const transporter=nodemailer.createTransport({
        service:'SendGrid',
        auth:{
            user:'apikey',
            pass:'put_your_pwd'
        }
    })

    const mailOptions={
        from:'yashgoenka100@gmail.com',
        to:options.to,
        subject:options.subject,
        html:options.text
    }

    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err)
        }else{
            console.log(info);
        }
    })
}
module.exports=sendEmail;