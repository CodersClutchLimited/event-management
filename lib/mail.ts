import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// console.log(process.env.RESEND_API_KEY);


const baseURL = process.env.NEXT_PUBLIC_APP_URL;
const emailURL = process.env.RESEND_EMAIL_URL;
// const ResendApiKey = process.env.RESEND_API_KEY
// todo: Only send emails to the "Resend" registered email if a domain is set and purchased.

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseURL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: `${emailURL}`,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${baseURL}/new-password?token=${token}`;

  await resend.emails.send({
    from: `${emailURL}`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: `${emailURL}`,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}.</p>`,
  });
};

export const SendEmailWhenEventDateUpdate = async (
  recipients: string[],
  subject: string,
  body: string
) => {
  try {
    if (!recipients.length) return;

    await resend.emails.send({
      from: "noreply@yourapp.com",
      to: recipients,
      subject: subject,
      text: body,
    });

    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


// invite staff 
export const SendInvitationLink = async () => {
  const invitationLink = `${baseURL}/setup-account?token=1234`;

  await resend.emails.send({
    from: `onboarding@resend.dev`,
    to: "honorablewaiga@gmail.com", 
    subject: "You're Invited: Set Up Your Staff Account",
    html: `
      <p>Hello,</p>
      <p>You have been invited to set up your staff account. Click the link below to complete your registration:</p>
      <p><a href="${invitationLink}" style="color: #007bff; text-decoration: none;">Set Up Your Account</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Admin Team</p>
    `,
  });
};
