import nodemailer from "nodemailer";


export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP configuration is missing.");
  }
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM ;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass
    }
  });
  await transporter.sendMail({
    from,
    to,
    subject,
    html
  });
}