// app/api/admin-auth/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminToken = process.env.ADMIN_UPLOAD_TOKEN;

    if (password === adminToken) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set("admin_access", password, {
        httpOnly: true, 
        path: "/",
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        // 30 minutes = 30 * 60 seconds
        maxAge: 30 * 60, 
      });

      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}