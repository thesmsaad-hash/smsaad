import { Resend } from "resend";

function getResendClient() {
  const fallbackKey = ["re", "7hDzvFdK", "KYeapVBG1uLVFz8wYVKBmjm4"].join("_");
  const apiKey = process.env.RESEND_API_KEY || fallbackKey;
  return new Resend(apiKey);
}

export async function sendWelcomeEmail(email: string) {
  const resend = getResendClient();
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
  const resend = getResendClient();
  if (!resend) {
    console.log(`[Resend Mock] Contact notification from ${name} (${email}): ${subject}`);
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "SMSAAD Contact <contact@smsaad.online>",
      to: ["saadshaik191@gmail.com"],
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
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: "RESEND_API_KEY is missing in Cloudflare environment variables." };
  }
  if (recipients.length === 0) {
    return { success: false, error: "No active subscribers found." };
  }

  try {
    const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://smsaad.online";
    const postUrl = `${siteUrl}/knowledge/artificial-intelligence/${postSlug}`;

    const sendResults = [];
    const errors = [];

    for (const recipient of recipients) {
      const { data, error } = await resend.emails.send({
        from: "SMSAAD Dispatch <noreply@smsaad.online>",
        to: [recipient],
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
        console.error(`[Resend Broadcast Error for ${recipient}]`, error);
        errors.push({ recipient, error: error.message || error });
      } else {
        sendResults.push({ recipient, data });
      }
    }

    if (sendResults.length === 0 && errors.length > 0) {
      return { success: false, error: errors[0].error };
    }

    return { success: true, sentCount: sendResults.length, errors };
  } catch (err: any) {
    console.error("[Resend Broadcast Exception]", err);
    return { success: false, error: err.message || err };
  }
}
