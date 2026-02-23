// app/api/auth/clear-cookie/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear auth cookies
    (
      await // Clear auth cookies
      cookies()
    ).delete("auth-token");
    (await cookies()).delete("user-data");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to clear cookies" },
      { status: 500 },
    );
  }
}
