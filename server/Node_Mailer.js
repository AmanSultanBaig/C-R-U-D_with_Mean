const nodemailer = require('nodemailer');
require('dotenv').config()

exports.Node_Mail = (email) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL, // TODO: your gmail account
            pass: process.env.PASSWORD // TODO: your gmail password
        }
    });

    // Step 2
    let mailOptions = {
        from: email, // TODO: email sender
        to: 'cba@gmail.com', // TODO: email receiver
        subject: 'Nodemailer - Test',
        text: 'Wooohooo it works!!'
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        return console.log('Email sent!!!');
    });

}