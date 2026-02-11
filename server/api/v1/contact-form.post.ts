import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, subject, message } = body;

  for (const key of ["name", "email", "subject", "message"]) {
    if (!body[key]) {
      setResponseStatus(event, 400);

      return { message: `Missing field "${key}"` };
    }

    if (typeof body[key] !== "string") {
      setResponseStatus(event, 400);

      return { message: `Field "${key}" must be of type "String"` };
    }
  }

  if (message.length < 25) {
    setResponseStatus(event, 400);

    return { message: 'Length of field "message" must be greater than or equal to 25' };
  }

  const mailConfig = useRuntimeConfig().mail;
  const smtpConfig = mailConfig.smtp;
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.tls,
    secureConnection: !smtpConfig.tls,
    auth: {
      user: smtpConfig.username,
      pass: smtpConfig.password
    },
    connectionTimeout: 10_000
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${smtpConfig.username}>`,
      replyTo: `"${name}" <${email}>`,
      to: `${mailConfig.recipient}`,
      subject,
      text: message
    });
  } catch (error) {
    setResponseStatus(event, 500);

    console.error("Failed to send mail", error);

    return {
      message: "Message could not be sent"
    };
  }

  setResponseStatus(event, 201);

  return {
    message: "ok"
  };
});
