const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
  });

  console.log('Email:', process.env.GMAIL_USER);
console.log('Password:', process.env.GMAIL_PASS);

  const mailOptions = {
    from: email,
    to: 'rigelexpo@gmail.com',
    subject: `Message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error.message); // Log the error message
      res.status(500).send(`Error sending email: ${error.message}`);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
  
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
