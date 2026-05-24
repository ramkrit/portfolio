import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Channel configuration helpers
// ---------------------------------------------------------------------------
const isGmailConfigured = () =>
  Boolean(process.env.EMAIL_ADDRESS && process.env.GMAIL_PASSKEY);

const isTelegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

// Recipients can be defined as a comma-separated list in RECIPIENT_EMAILS.
// Falls back to EMAIL_ADDRESS (the sender mailbox) if not provided.
// Example .env value:
//   RECIPIENT_EMAILS=rkrit851@gmail.com,ramkrit824472@gmail.com
const getRecipientEmails = () => {
  const raw = process.env.RECIPIENT_EMAILS;
  if (raw && raw.trim().length > 0) {
    const list = raw
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    if (list.length > 0) return list;
  }
  return process.env.EMAIL_ADDRESS ? [process.env.EMAIL_ADDRESS] : [];
};

// ---------------------------------------------------------------------------
// Telegram
// ---------------------------------------------------------------------------
async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const res = await axios.post(url, { text: message, chat_id });
    if (res.data?.ok) {
      return { success: true };
    }
    return {
      success: false,
      error: res.data?.description || 'Telegram API returned ok=false',
    };
  } catch (error) {
    const detail = error.response?.data?.description || error.message;
    console.error('Error sending Telegram message:', detail);
    return { success: false, error: detail };
  }
}

// ---------------------------------------------------------------------------
// Gmail (Nodemailer)
// ---------------------------------------------------------------------------
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;

  const recipients = getRecipientEmails();
  if (recipients.length === 0) {
    return { success: false, error: 'No recipient email configured.' };
  }

  // Build the transporter lazily so we don't fail at import time
  // if the env vars are missing.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSKEY,
    },
  });

  const mailOptions = {
    from: `Portfolio <${process.env.EMAIL_ADDRESS}>`,
    to: recipients, // Nodemailer accepts a string or an array of recipients
    subject: `Portfolio: New Message From ${name}`,
    text: message,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, recipients };
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return { success: false, error: error.message };
  }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload || {};

    if (!name || !email || !userMessage) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const gmailOn = isGmailConfigured();
    const telegramOn = isTelegramConfigured();

    // Neither channel is configured — treat as a server-side misconfiguration.
    if (!gmailOn && !telegramOn) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Contact form is not configured. Please set up Gmail or Telegram in the environment variables.',
        },
        { status: 503 }
      );
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    // Run only the channels that are configured, in parallel.
    const tasks = [];
    if (gmailOn) tasks.push(sendEmail(payload, message).then((r) => ({ channel: 'email', ...r })));
    if (telegramOn) tasks.push(sendTelegramMessage(message).then((r) => ({ channel: 'telegram', ...r })));

    const results = await Promise.all(tasks);

    const succeeded = results.filter((r) => r.success).map((r) => r.channel);
    const failed = results.filter((r) => !r.success);

    // At least one channel delivered the message.
    if (succeeded.length > 0) {
      return NextResponse.json(
        {
          success: true,
          message: `Message sent successfully via ${succeeded.join(' and ')}.`,
          delivered: succeeded,
          failed: failed.map((f) => ({ channel: f.channel, error: f.error })),
        },
        { status: 200 }
      );
    }

    // All configured channels failed.
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message through all configured channels.',
        failed: failed.map((f) => ({ channel: f.channel, error: f.error })),
      },
      { status: 502 }
    );
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.', error: error.message },
      { status: 500 }
    );
  }
}
