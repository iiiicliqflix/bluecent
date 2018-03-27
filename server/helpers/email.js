import nodemailer from "nodemailer";
import { emailConfig } from "../config";

const from = "Bluecent Team";

export function sendVerificationEmail(email, first, token) {
  const transporter = nodemailer.createTransport(emailConfig);
  const baseUrl = process.env.NODE_ENV === "production" ? "https://www.bluecent.org" : "http://localhost:3000";
  const html = `<div style="width: 750px;"><p>Hi ${first},</p><p>Thanks so much for joining Bluecent! The most important step we can take towards defeating the Trump Administration and their destructive agenda is winning the upcoming Congressional elections in 2018. Even the smallest contributions over time can make all the difference in close races across the country.</p><p>Our FAQ goes into greater detail about how the app works, and I encourage you to check it out. You'll also be using our beta release, so it would be helpful to report any bugs or strange behavior that you notice while using Bluecent.</p><p>Before the app starts rounding-up and contributing your spare change, you need to confirm your account by clicking on the link below:</p><a href="${baseUrl}/confirm/?email=${email}&token=${token}" style="background-color: #0c1c5e; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin: 20px 0; display: inline-block;">Activate Account</a><p>Thanks again, and be sure to reach out if you have any questions!</p><p>- Bluecent Team</p></div>`;

  transporter.sendMail(
    {
      from,
      to: email,
      subject: "Thanks for joining Bluecent!",
      html
    },
    err => {
      if (err) {
        return err;
      }
    }
  );
}
