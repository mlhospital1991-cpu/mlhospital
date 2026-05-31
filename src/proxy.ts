import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ml-hospital-super-secret-key-change-this-in-prod"
);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify token validity using jose (compatible with Edge runtime)
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized: Invalid or expired session" }, { status: 401 });
  }
}

export default proxy;

// Apply proxy matchers to admin API routes
export const config = {
  matcher: "/api/admin/:path*",
};
