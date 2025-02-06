require("dotenv").config();
const nodemailer = require("nodemailer");

const submitFeedback = async (req, res) => {
  try {
    const { email, feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ message: "Feedback is required" });
    }

    // 📌 Create a mail transporter using env variables
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // 🔹 Uses environment variable
        pass: process.env.EMAIL_PASS, // 🔹 Uses environment variable
      },
    });

    // 📌 Mail details
    let mailOptions = {
      from: email || "no-reply@shopkaro.com",
      to: "gamermohan38@gmail.com",
      subject: "📝 New Customer Feedback - Shop Karo",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #ff6800; text-align: center;">🛒 Shop Karo - Customer Feedback</h2>
          <p style="color: #333;">Dear Admin,</p>
          <p>You have received new feedback from a customer.</p>
          <div style="border-left: 4px solid #ff6800; padding-left: 10px; margin: 15px 0; background: #fff; padding: 10px; border-radius: 5px;">
            <p><strong>📧 Email:</strong> ${email || "Not Provided"}</p>
            <p><strong>📝 Feedback:</strong></p>
            <p style="color: #555;">"${feedback}"</p>
          </div>
          <p style="color: #333;">Please review the feedback and take necessary actions if required.</p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; color: #888; font-size: 12px;">This is an automated message from Shop Karo. Please do not reply to this email.</p>
        </div>
      `,
    };
    

    // 📌 Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { submitFeedback };
