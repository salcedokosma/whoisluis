require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup with MailerSend
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net', // MailerSend SMTP host
    port: 587, // Typically 587 for TLS
    auth: {
        user: process.env.MAILERSEND_USERNAME, // Use environment variable for username
        pass: process.env.MAILERSEND_API_KEY // Use environment variable for API key
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'salcedokosma@gmail.com', // Your email
        subject: `Contact Request from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 