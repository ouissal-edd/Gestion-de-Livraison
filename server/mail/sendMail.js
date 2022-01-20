const nodemailer = require('nodemailer')
const MailToChauffeur = async (email, fullName,zone,depart,arrive,poid) => {
  try {
                 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: "MarocShip",
        text: `Hello`+fullName+`New Delevery has ben added to type B check your account to take it :) ,
         Information[ Contry:`+zone+`,
         From:`+depart+`,
         To:`+arrive+`,
         Poid:`+poid+`,

                    ]`

    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        } else {
            console.log('mail sent to :', email)
            return res.status(200).json({
                success: 1,
                message: 'data has sent '
            });
        }


    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = MailToChauffeur ;