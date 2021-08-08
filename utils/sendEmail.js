const nodemailer=require('nodemailer')

const sendEmail=(options)=>{
    const transporter=nodemailer.createTransport({
        service:'SendGrid',
        auth:{
            user:'apikey',
            pass:'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'
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