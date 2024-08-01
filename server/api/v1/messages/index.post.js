import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, subject, message } = body;

  for (const key of ["name", "email", "subject", "message"]) {
    if (!body[key]) {
      setResponseStatus(event, 400);

      return { message: `Missing property "${key}"` };
    }

    if (typeof body[key] !== "string") {
      setResponseStatus(event, 400);

      return { message: `Property "${key}" must be of type "String"` };
    }
  }

  if (message.length < 25) {
    setResponseStatus(event, 400);

    return { message: 'Length of property "message" must be greater than or equal to 25' };
  }

  const config = useRuntimeConfig();
  const useTLS = config.mailSecure === "true";
  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: parseInt(config.mailPort),
    secure: useTLS,
    secureConnection: !useTLS,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword
    },
    connectionTimeout: 10_000
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${config.mailUser}>`,
      replyTo: `"${name}" <${email}>`,
      to: `${config.mailRecipient}`,
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
