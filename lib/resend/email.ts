import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail(email: string) {
  if (!resend) {
    console.log(`[Resend Mock] Welcome email dispatched to ${email}`);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "SMSAAD <noreply@smsaad.online>",
      to: [email],
      subject: "Welcome to SMSAAD — AI Video & Creative Technology Knowledge Base",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #FFFFFF; padding: 40px; border-radius: 12px;">
          <h1 style="color: #7C3AED; font-size: 28px;">Welcome to SMSAAD 2.0</h1>
          <p style="color: #A1A1AA; font-size: 16px; line-height: 1.6;">
            Thank you for subscribing to SMSAAD. You now have access to high-density first-principles documentation on AI Video, Visual Effects (VFX), Diffusion Models, and Creative Technology.
          </p>
          <div style="margin-top: 24px; padding: 20px; background-color: #111827; border: 1px solid #27272A; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #22D3EE;">Where to start?</h3>
            <ul style="color: #A1A1AA; padding-left: 20px;">
              <li>Explore the <strong>Docs Engine</strong> for theoretical foundations.</li>
              <li>Read long-form <strong>Guides</strong> on production pipelines.</li>
              <li>Benchmark tools in our <strong>AI Tools Library</strong>.</li>
            </ul>
          </div>
          <p style="margin-top: 30px; color: #71717A; font-size: 14px;">
            SMSAAD — Built for Creative Engineers & AI Researchers.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[Resend Exception]", err);
    return { success: false, error: err };
  }
}

export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
  if (!resend) {
    console.log(`[Resend Mock] Contact notification from ${name} (${email}): ${subject}`);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "SMSAAD Contact <contact@smsaad.online>",
      to: ["admin@smsaad.com"],
      subject: `New Contact Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #FFFFFF; padding: 30px;">
          <h2 style="color: #7C3AED;">New Contact Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #111827; border: 1px solid #27272A; padding: 15px; border-radius: 8px; color: #A1A1AA;">
            <p>${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      `,
    });

    return { success: !error, data, error };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function sendNewPostBroadcast(
  recipients: string[],
  postTitle: string,
  postSlug: string,
  postType: string,
  postDescription: string
) {
  if (!resend || recipients.length === 0) {
    console.log(`[Resend Mock] New post notification sent to ${recipients.length} recipients.`);
    return { success: true, mocked: true };
  }

  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const postUrl = `${siteUrl}/knowledge/artificial-intelligence/${postSlug}`;

    const { data, error } = await resend.emails.send({
      from: "SMSAAD Dispatch <noreply@smsaad.online>",
      to: recipients,
      subject: `🚀 New ${postType.toUpperCase()}: ${postTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #FFFFFF; padding: 40px; border-radius: 12px;">
          <div style="display: inline-block; padding: 4px 12px; background-color: rgba(124, 58, 237, 0.2); border: 1px solid #7C3AED; color: #22D3EE; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
            New ${postType} Article Published
          </div>
          <h1 style="color: #FFFFFF; font-size: 24px; margin-top: 16px;">${postTitle}</h1>
          <p style="color: #A1A1AA; font-size: 15px; line-height: 1.6;">
            ${postDescription}
          </p>
          <div style="margin-top: 24px;">
            <a href="${postUrl}" style="display: inline-block; padding: 12px 24px; background-color: #7C3AED; color: #FFFFFF; text-decoration: none; font-weight: bold; border-radius: 8px;">
              Read Full Article on SMSAAD →
            </a>
          </div>
          <p style="margin-top: 40px; color: #71717A; font-size: 12px; border-top: 1px solid #27272A; padding-top: 16px;">
            You are receiving this because you subscribed to SMSAAD Newsletter.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Broadcast Error]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("[Resend Broadcast Exception]", err);
    return { success: false, error: err };
  }
}
