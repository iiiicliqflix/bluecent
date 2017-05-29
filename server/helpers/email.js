import nodemailer from 'nodemailer';
import { emailConfig } from '../config';

const from = 'BlueCent Team';

export function sendVerificationEmail(email, first, token) {
  const transporter = nodemailer.createTransport(emailConfig);
  const html = "<a href='" + "http://localhost:3000/verify-account/?email=" + email + "&token=" + token + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Activate Account</a>"

  transporter.sendMail({
    from,
    to: email,
    subject: 'Verify Email',
    html,
  }, (err) => { if (err) { return err; } });
}
