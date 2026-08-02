import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/zod/schemas";
import { sendWelcomeEmail } from "@/lib/resend/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Send Welcome Email via Resend helper
    const emailRes = await sendWelcomeEmail(email);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to SMSAAD Dispatch",
      emailStatus: emailRes,
    });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
