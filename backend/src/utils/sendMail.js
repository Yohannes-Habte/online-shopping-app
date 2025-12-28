import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SENDER,
  EMAIL_PASSWORD,
} from "../config/env.js";

/**
 * Sends an email using the configured SMTP server.
 *
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 * @param {string} [options.text] - Plain text content (optional)
 * @param {string|string[]} [options.cc] - CC email addresses (optional)
 * @param {string|string[]} [options.bcc] - BCC email addresses (optional)
 */
const sendEmail = async ({ to, subject, html, text, cc, bcc }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("SMTP server is ready to take messages");

    const mailOptions = {
      from: EMAIL_SENDER,
      to,
      subject,
      html,
      text: text || "Please view this email in an HTML-compatible client.",
      cc,
      bcc,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

export default sendEmail;
