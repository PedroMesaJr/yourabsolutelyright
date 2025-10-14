// Contact form route for yourabsolutelyright.com
// Handles contact form submissions and sends emails to support

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure email transporter
// For development: Uses ethereal.email (test email service)
// For production: Configure with real SMTP settings in .env
const createTransporter = async () => {
  // If production SMTP settings are available, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Otherwise, use ethereal.email for testing
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, orderNumber } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'Name, email, subject, and message are required'
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email address',
        details: 'Please provide a valid email address'
      });
    }

    // Create transporter
    const transporter = await createTransporter();

    // Format subject based on form selection
    const subjectMap = {
      'order-issue': 'Order Issue',
      'payment-problem': 'Payment Problem',
      'general-question': 'General Question',
      'product-suggestion': 'Product Suggestion',
      'legal': 'Legal Matter',
      'other': 'Other'
    };

    const emailSubject = `[Contact Form] ${subjectMap[subject] || subject}${orderNumber ? ` - Order #${orderNumber}` : ''}`;

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #D06D4F 0%, #C45C3F 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            You're Absolutely Right.
          </h1>
          <p style="color: #F4F3EE; margin: 10px 0 0 0;">New Contact Form Submission</p>
        </div>

        <div style="background: #F4F3EE; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #3A3631; margin-top: 0;">Contact Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #3A3631; width: 150px;">Name:</td>
              <td style="padding: 10px 0; color: #3A3631;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #3A3631;">Email:</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #D06D4F; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #3A3631;">Subject:</td>
              <td style="padding: 10px 0; color: #3A3631;">${subjectMap[subject] || subject}</td>
            </tr>
            ${orderNumber ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #3A3631;">Order Number:</td>
              <td style="padding: 10px 0; color: #3A3631;">${orderNumber}</td>
            </tr>
            ` : ''}
          </table>

          <h3 style="color: #3A3631; margin-top: 30px; margin-bottom: 15px;">Message:</h3>
          <div style="background: #FFFFFF; border: 2px solid #D06D4F; border-radius: 8px; padding: 20px;">
            <p style="color: #3A3631; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #D06D4F; text-align: center;">
            <p style="color: #C7BFB3; font-size: 12px; margin: 0;">
              Sent from yourabsolutelyright.com contact form
            </p>
          </div>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subjectMap[subject] || subject}
${orderNumber ? `Order Number: ${orderNumber}\n` : ''}
Message:
${message}

---
Sent from yourabsolutelyright.com contact form
    `;

    // Send email
    const info = await transporter.sendMail({
      from: `"YouAbsolutelyRight Contact Form" <noreply@yourabsolutelyright.com>`,
      to: process.env.SUPPORT_EMAIL || 'support@yourabsolutelyright.com',
      replyTo: email, // Allow direct reply to customer
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log('[Contact Form] Message sent:', info.messageId);

    // If using ethereal.email (test mode), log preview URL
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('[Contact Form] Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('[Contact Form Error]', error);
    res.status(500).json({
      error: 'Failed to send message',
      details: 'An error occurred while processing your request'
    });
  }
});

module.exports = router;
