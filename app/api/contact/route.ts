import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/zod/schemas";
import { sendContactNotification } from "@/lib/resend/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Send Admin Email Notification via Resend
    const resendRes = await sendContactNotification(name, email, subject, message);

    return NextResponse.json({
      success: true,
      message: "Message received. Our technical team will get back to you shortly.",
      resendRes,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
