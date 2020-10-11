const nodemailer = require('nodemailer');
require('dotenv').config()

exports.Node_Mail = (email) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    // Step 2
    const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: 'Registration Email', // Subject line
        html: 'Congratulation! You have registered yourself with us.'// plain text body
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs ', err);
        }
        return console.log('Email sent!!!');
    });

}