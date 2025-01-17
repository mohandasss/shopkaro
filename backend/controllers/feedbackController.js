const nodemailer = require('nodemailer');

const sendFeedback = async (req, res) => {
  const { feedback, email } = req.body;  // Use the email provided in the request body

  // Set up the transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your email (defined in .env)
      pass: process.env.EMAIL_PASS,  // Your email password or app-specific password
    },
  });

  try {
    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gamermohan38@gmail.com',  // Admin's email where feedback will be sent
      subject: 'New Feedback Submission',
      text: `New feedback received: \n\nUser Email: ${email}\nFeedback: ${feedback}`,
    };

    await transporter.sendMail(adminMailOptions);

    // Send thank you email to the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,  // Send the thank you email to the user
      subject: 'Thank You for Your Feedback!',
      text: `Hi,\n\nThank you for submitting your feedback! We appreciate your input and will consider it.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ message: 'Failed to send feedback. Please try again later.' });
  }
};

module.exports = { sendFeedback };
