import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewPostBroadcast } from "@/lib/resend/email";

export async function POST(request: Request) {
  try {
    const { title, slug, type, description } = await request.json();

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch active subscriber emails
    const { data: subscribers, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("status", "active");

    let recipientEmails: string[] = ["saadshaik191@gmail.com", "smsaad05082003@gmail.com"];

    if (subscribers && subscribers.length > 0) {
      const dbEmails = subscribers.map((s) => s.email);
      recipientEmails = Array.from(new Set([...recipientEmails, ...dbEmails]));
    }

    console.log(`[Broadcast] Sending new post email notification to ${recipientEmails.length} subscribers...`);

    const broadcastResult = await sendNewPostBroadcast(
      recipientEmails,
      title,
      slug,
      type || "knowledge",
      description || "A new technical breakdown has just been published on SMSAAD Platform."
    );

    if (!broadcastResult.success) {
      const errMsg = typeof broadcastResult.error === "string" 
        ? broadcastResult.error 
        : JSON.stringify(broadcastResult.error);
      return NextResponse.json({
        success: false,
        error: errMsg || "Failed to send email broadcast",
      });
    }

    return NextResponse.json({
      success: true,
      recipientsCount: recipientEmails.length,
      recipients: recipientEmails,
      result: broadcastResult,
    });
  } catch (err: any) {
    console.error("[Broadcast API Error]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send broadcast email" },
      { status: 500 }
    );
  }
}
